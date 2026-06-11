module "user_post_confirmation" {
  source = "./post-confirmation"

  project               = local.project
  cognito_user_pool_arn = tolist(data.aws_cognito_user_pools.this.arns)[0]
  role_arn              = data.aws_ssm_parameter.lambda_role_arn.value
  backend_url           = local.backend_urls[local.stage]
  stage                 = local.stage
  tags                  = local.tags
}

module "pre_token" {
  source = "./pre-token"

  project               = local.project
  cognito_user_pool_arn = tolist(data.aws_cognito_user_pools.this.arns)[0]
  role_arn              = data.aws_ssm_parameter.lambda_role_arn.value
  stage                 = local.stage
  tags                  = local.tags
}
