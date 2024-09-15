import { StackProps } from "aws-cdk-lib";

export interface Props extends StackProps {
    readonly environment: string;
}