import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Props } from '../props';

export class DatabaseResources extends Construct {
  public readonly vpc: ec2.Vpc;
  public readonly rdsInstance: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    // Create VPC
    this.vpc = new ec2.Vpc(this, `${props.environment}-VPC`, {
        maxAzs: 2,
        natGateways: 0,
        subnetConfiguration: [
            {
              cidrMask: 24,
              name: 'public-subnet',
              subnetType: ec2.SubnetType.PUBLIC,  // Public subnet doesn't need NAT
            },
            {
              cidrMask: 24,
              name: 'private-subnet',
              subnetType: ec2.SubnetType.PRIVATE_ISOLATED,  // Isolated subnet without NAT
            }
          ],
    });

    // Generate a secret for the RDS root user
    const databaseCredentialsSecret = new secretsmanager.Secret(this, `${props.environment}-DBCredentialsSecret`, {
        generateSecretString: {
            secretStringTemplate: JSON.stringify({ username: `${props.environment}root` }),
            generateStringKey: 'password',
            excludePunctuation: true,
        },
    });

    const engine = rds.DatabaseInstanceEngine.postgres({ 
        version: rds.PostgresEngineVersion.VER_16_3 
    });

    const vpc = this.vpc;
    this.rdsInstance = new rds.DatabaseInstance(this, `${props.environment}-PostgresInstance`, {
        engine,
        vpc,
        // credentials: rds.Credentials.fromGeneratedSecret(`${props.environment}-username`, {
        //     secretName: `${props.environment}-db-secret`, 
        //     excludeCharacters: '!&*^#@()/"\\ ',
        // }),
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
        credentials: rds.Credentials.fromSecret(databaseCredentialsSecret), 
        deletionProtection: false,
        removalPolicy: cdk.RemovalPolicy.DESTROY,  // RETAIN/DESTROY
        allocatedStorage: 20, // 20GB storage
        maxAllocatedStorage: 100, // Optionally allow auto-scaling of storage
        multiAz: false, // Disable multi-AZ for cost-saving
        publiclyAccessible: false, // Ensure it's not exposed to the internet
        vpcSubnets: {
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED,  // Use isolated subnets for RDS
        },
    });

    // Output the VPC ID
    new cdk.CfnOutput(this, `${props.environment}-VpcId`, {
        value: this.vpc.vpcId,
        description: 'The ID of the VPC for RDS',
    });

    // Output the RDS instance endpoint
    new cdk.CfnOutput(this, `${props.environment}-RDSInstanceEndpoint`, {
        value: this.rdsInstance.dbInstanceEndpointAddress,
        description: 'The endpoint for the RDS instance',
    });
  }
}
