locals {
  function_name = "${var.project}-lambda-eventbridge-products-${var.stage}-01"
}

data "aws_cloudwatch_event_rule" "this" {
  name           = "${var.project}-rule-products-${var.stage}"
  event_bus_name = "${var.project}-event-bus-${var.stage}"
}

module "lambda" {
  source = "sass-ecommerce/ctv-infraestructura-terraform-modules-01/modules/lambda"

  function_name      = local.function_name
  runtime            = "nodejs24.x"
  handler            = "index.eventBridgeProducts"
  role_arn           = var.role_arn
  filename           = "${path.module}/../../eventbridge-products.zip"
  source_code_hash   = filebase64sha256("${path.module}/../../eventbridge-products.zip")
  log_retention_days = 7

  environment_variables = {
    STAGE = var.stage
  }

  permissions = {
    allow_eventbridge = {
      action     = "lambda:InvokeFunction"
      principal  = "events.amazonaws.com"
      source_arn = data.aws_cloudwatch_event_rule.this.arn
    }
  }

  tags = var.tags
}

resource "aws_cloudwatch_event_target" "this" {
  rule           = data.aws_cloudwatch_event_rule.this.name
  event_bus_name = data.aws_cloudwatch_event_rule.this.event_bus_name
  arn            = module.lambda.function_arn
}
