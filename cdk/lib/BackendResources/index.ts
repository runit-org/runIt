import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Repository } from 'aws-cdk-lib/aws-ecr';

export class BackendResources extends Construct {
  public readonly ecrRepository: Repository;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create ECR repository
    this.ecrRepository = new Repository(this, 'DjangoBackendECR', {
      repositoryName: 'django-backend-ecr',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Output the repository URI
    new cdk.CfnOutput(this, 'ECRRepoURI', {
      value: this.ecrRepository.repositoryUri,
      description: 'URI for django backend ECR',
    });
  }
}
