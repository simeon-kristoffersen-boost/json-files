// Description: Our get-template asks your API server to get a resource.
const got = require("got");
// got documentation: https://github.com/sindresorhus/got#readme
module.exports = async (data, logger, callback) => {
  let success = false;
  let order = null;

  // URL (a static file — it cannot filter for us)
  const url = "https://raw.githubusercontent.com/simeon-kristoffersen-boost/json-files/refs/heads/main/fetch_order_info.json";

  // The name we want to look up
  const { customer_name } = data.request;

  try {
    const response = await got.get(url, {
      responseType: "json",
      timeout: 10000
    });

    success = String(response.statusCode).startsWith("2");

    if (success) {
      const orders = response.body.orders || {};

      // JSON keys are all lowercase, so lowercase the search term to match
      const key = customer_name.toLowerCase();
      order = orders[key] || null;

      if (!order) {
        logger.log(`No order found for customer: ${customer_name}`);
      }
    } else {
      logger.log(response.statusCode);
      logger.log(response.statusMessage);
    }
  } catch (err) {
    logger.log("Request failed for technical reasons.");
    logger.log(err);
  }

  const result = {
    generative_action_response: JSON.stringify(
      order || { error: `No order found for ${customer_name}` }
    )
  };

  callback(result);
};
