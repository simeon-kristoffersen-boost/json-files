module.exports = async (data, logger, callback) => {
	try {
    logger.log("Constructing variables");
    
    // You can change the variable names and values below.
    // These represent the data you would normally fetch from an API.
    const contents = ["Milk", "Sugar", "Eggs"];
    const status = "Underway";
    const exp_delivery = "2026-06-22";
    const current_loc = "Stavanger";
    
    // These variables are packaged into an object.
    // This is where we create the final labels they will have in the output.
    // You can change these labels too.
    const hookData = {
      package_contents: contents,
      delivery_status: status,
      expected_delivery_date: exp_delivery,
      current_location: current_loc
    };
    logger.log("Turning variables into response: " + JSON.stringify(hookData));
    
    // IMPORTANT: An API Hook must always return 'generative_action_response' 
    // This is a stringified JSON object. Do not use helpers.toResult here.
    const result = {
    	generative_action_response: JSON.stringify(hookData)
    };
    callback(result);
  } catch (error) {
    
    // Basic error handling.
    logger.log("Error in API Hook: " + error.message);
    const errorResult = {
    	generative_action_response: JSON.stringify({ error: "Failed to retrieve data" })
    };
    callback(errorResult);
}
};
