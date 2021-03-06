var Block = require('./Block');

///////////////////////////////////////////////////////////////////////////////
// BlueBlock
//
//
///////////////////////////////////////////////////////////////////////////////
var BlueBlock = Block.extend({
	init: function(parent)
	{
		this._super(parent);
		this.fillColor = this.processing.color(0,128,255);
		this.type = BlueBlock.Type;
	}
});
BlueBlock.Type = "Blue";
Block.registerBlock(BlueBlock);
module.exports = BlueBlock;
