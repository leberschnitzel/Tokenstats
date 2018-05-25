/**
 * @OnlyCurrentDoc Limits the script to only accessing the current sheet.
 */

/**
 * A special function that runs when the spreadsheet is open, used to add a
 * custom menu to the spreadsheet.
 */
function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu("Tokenstats")
  .addItem("How To", "HowTo")
  .addToUi();
}

function HowTo() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert('How To', 'This addon gets ROI info from https://tokenstats.io/\n\n=tokenstats("Token")\nwill get the USD ROI% from tokenstats.\n\n=tokenstats("Token","ETH")\n=tokenstats("Token","BTC")\nwill get the ETH/BTC ROI%.\n\n=tokenstats("Token","Currency","x")\nwill get the ROIx for the specified currency.\n\nThanks to softcrypto for providing this API!',ui.ButtonSet.OK);
  if (result == ui.Button.OK) {
 } 
}


/**
 * Gets ROI info from https://tokenstats.io
 * @param {String} Token - enter the Token short name you want the ROI of.
 * @param {String} Currency - optional: Enter USD, BTC or ETH to get respective ROI. Standard is USD.
 * @param {String} xorp - optional: Enter "x" or "p" to get ROIx or ROI%. Standard is ROI%
 * @return {Number} The ROI of the specified token.
 * @customfunction
 */

function tokenstats (Token,Currency,xorp){
  if (Token){
    var response = UrlFetchApp.fetch('https://tokenstats.io/api/v1/roi?symbol=' + Token);
    var json = response.getContentText();
    try
    {
      var returns = JSON.parse(json);
    } 
    catch(err)
    {
      return "Unknown Token"
    }
    if (xorp){
      if (xorp == "p"){
        if (Currency == "BTC"){
          return returns.roi_btc
        }else if (Currency == "ETH"){
          return returns.roi_eth
        }else{
          return returns.roi_usd
        }
      } else if (xorp == "x"){
        if (Currency == "BTC"){
          return returns.roix_btc
        }else if (Currency == "ETH"){
          return returns.roix_eth
        }else{
          return returns.roix_usd
        }
      }else {
        return "Please enter p for percent or x for factor."
      } 
    }else {
      if (Currency == "BTC"){
        return returns.roi_btc
      }else if (Currency == "ETH"){
        return returns.roi_eth
      }else{
        return returns.roi_usd
      }
    }
  } 
}

