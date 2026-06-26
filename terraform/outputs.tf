output "post_confirmation_lambda_name" {
  description = "Nombre de la Lambda user-post-confirmation"
  value       = module.user_post_confirmation.lambda_name
}

output "pre_token_lambda_name" {
  description = "Nombre de la Lambda pre-token"
  value       = module.pre_token.lambda_name
}

output "s3_products_upload_lambda_name" {
  description = "Nombre de la Lambda s3-products-upload"
  value       = module.s3_products_upload.lambda_name
}

output "eventbridge_products_lambda_name" {
  description = "Nombre de la Lambda eventbridge-products"
  value       = module.eventbridge_products.lambda_name
}

output "eventbridge_products_rule_arn" {
  description = "ARN del EventBridge Rule de products"
  value       = module.eventbridge_products.event_rule_arn
}
