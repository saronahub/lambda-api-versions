# lambda-api-versions
A simple AWS Lambda function that returns available API versions

## Execution role

Create a custom role with the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "apigateway:*"
            ],
            "Resource": "*"
        }
    ]
}
```
