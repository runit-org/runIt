import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { Props } from '../props';

export class BackendResources extends Construct {
  public readonly ecrRepository: Repository;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    // Create ECR repository
    this.ecrRepository = new Repository(this, `${props.environment}-DjangoBackendECR`, {
      repositoryName: `${props.environment}-django-backend-ecr`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Output the repository URI
    new cdk.CfnOutput(this, `${props.environment}-ECRRepoURI`, {
      value: this.ecrRepository.repositoryUri,
      description: 'URI for django backend ECR',
    });
  }
}
