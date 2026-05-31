output "post_confirmation_lambda_name" {
  description = "Nombre de la Lambda user-post-confirmation"
  value       = module.user_post_confirmation.lambda_name
}

output "pre_token_lambda_name" {
  description = "Nombre de la Lambda pre-token"
  value       = module.pre_token.lambda_name
}
