locals {
  function_name = "${var.project}-lambda-s3-products-upload-${var.stage}-01"
  lambda_arn    = "arn:aws:lambda:${data.aws_region.current.region}:${data.aws_caller_identity.current.account_id}:function:${local.function_name}"
}

module "lambda" {
  source = "sass-ecommerce/ctv-infraestructura-terraform-modules-01/modules/lambda"

  function_name      = local.function_name
  runtime            = "nodejs24.x"
  handler            = "index.productsUpload"
  role_arn           = var.role_arn
  filename           = "${path.module}/../../s3-products-upload.zip"
  source_code_hash   = filebase64sha256("${path.module}/../../s3-products-upload.zip")
  log_retention_days = 7

  environment_variables = {
    STAGE = var.stage
  }

  permissions = {
    allow_s3 = {
      action     = "lambda:InvokeFunction"
      principal  = "s3.amazonaws.com"
      source_arn = data.aws_s3_bucket.products.arn
    }
  }

  tags = var.tags
}

resource "aws_s3_bucket_notification" "products_upload" {
  bucket = data.aws_s3_bucket.products.id

  lambda_function {
    lambda_function_arn = local.lambda_arn
    events              = ["s3:ObjectCreated:Put"]
  }

  depends_on = [module.lambda]
}
