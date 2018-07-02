const AWS = require("aws-sdk");

exports.handler = async (event, context, callback) => {
  const response = (data, statusCode = '200') => {
    console.log('statusCode: %s', statusCode);
    console.log('data: %s', JSON.stringify(data));

    return callback(null, {
      statusCode,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  const { restApiId } = process.env;
  const apiGateway = new AWS.APIGateway();

  let stages;
  try {
    stages = await apiGateway.getStages({
      restApiId
    }).promise();
  } catch (e) {
    return response({
      success: false,
      error: 'Unexpected server error'
    }, '500');
  }

  if (!stages) {
    return response({
      success: false,
      error: 'Couldn\'t find available API versions'
    });
  }

  const versions = [];

  for (let i = 0; i < stages.item.length; i += 1) {
    const version = stages.item[i].stageName;

    // this is to ignore "versions" stage that exist because of the way API Gateway works
    if (version !== 'versions') {
      versions.push(version);
    }
  }

  return response({
    success: true,
    data: versions
  });
};
