var Class = require('../Class');
var Log = require('../Log');

var logger = new Log.Logger("test");
logger.LogLevel = Log.DEBUG | Log.WARN | Log.ERROR;


logger.debug("debug log");
logger.warn("warning log");
try
{
	logger.error("error log");	
}
catch(e)
{
	logger.debug("caught error log exception");
}
