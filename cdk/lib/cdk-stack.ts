import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Props } from './props';
import { BackendResources } from './BackendResources';
import { DatabaseResources } from './DatabaseResources';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    new BackendResources(this, 'BackendResources', props);

    const databaseResources = new DatabaseResources(this, 'DatabaseResources', props);

    const vpc = databaseResources.vpc;
    const rdsInstance = databaseResources.rdsInstance;

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
