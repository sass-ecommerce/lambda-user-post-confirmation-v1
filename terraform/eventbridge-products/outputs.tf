output "lambda_name" {
  description = "Nombre de la Lambda Function"
  value       = local.function_name
}

output "lambda_arn" {
  description = "ARN de la Lambda Function"
  value       = module.lambda.function_arn
}

output "event_rule_arn" {
  description = "ARN del EventBridge Rule"
  value       = local.rule_arn
}
