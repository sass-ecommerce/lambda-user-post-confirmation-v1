data "aws_ssm_parameter" "lambda_role_arn" {
  name = "/${local.stage}/${local.project}/iam/lambda-role-arn"
}

data "aws_cognito_user_pools" "this" {
  name = "${local.project}-user-pool-${local.stage}"
}
