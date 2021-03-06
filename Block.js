var GameObject = require('./GameObject');
var Key = require('./Key');

///////////////////////////////////////////////////////////////////////////////
// Block
//
//
///////////////////////////////////////////////////////////////////////////////
var Block = GameObject.extend({
	init: function(parent)
	{
		this._super(parent);
		this.logger.scope = "Block";
		this.type = null;
		this.width = Block.Width;
		this.height = Block.Height;
		this.commit();
		
		this.fillColor = this.processing.color(255,255,255);
		this.strokeColor = this.processing.color(0,0,0);
		this.isDestroying = false;
		
		this.targetFillColor = this.fillColor;
		this.targetStrokeColor = this.strokeColor;
	},
	
	getKey: function()
	{
		var key = new Key();
		key.x = Math.floor(this.x/Block.Width)*Block.Width;
		key.y = Math.floor(this.y/Block.Height)*Block.Height;
		return key;
	},
	
	save: function()
	{
		return {type:this.type};
	},
	
	drawObject: function()
	{
		var key = this.getKey();
		var dx = key.x - this.x;
		var dy = key.y - this.y;
		this.processing.fill(this.fillColor);
		this.processing.stroke(this.strokeColor);
		this.processing.rect(dx, dy, this.width, this.height);
		this._super();
	},
	
	mouseClicked: function(x, y)
	{
		if(this.userInteractionEnabled && this.containsPoint(x, y))
		{
			this.logger.debug("clicked");
			this.destroy();
			return true;
		}
		return false;
	},
	
	update: function()
	{
		// this.logger.debug("called");
		var changed = this._super();
		if(this.isDestroying)
		{
			this.logger.debug("isDestroying");
			if(!changed)
			{
				this.logger.debug("!changed");
				this.x = this.ox;
				this.y = this.oy;
				this.parent.removeObject(this.getKey());
			}
			else
			{
				this.fillColor = this.processing.lerpColor(this.fillColor, this.targetFillColor, this.speed);
				this.strokeColor = this.processing.lerpColor(this.strokeColor, this.targetStrokeColor, this.speed);
			}
		}
		
		return changed;
	},
	
	destroy: function()
	{
		this.logger.debug("called");
		this.userInteractionEnabled = false;
		this.isDestroying = true;
		this.syncToRegion = false;
		this.speed = this.targetSpeed = .4;
		var n = Block.Width;
		this.ox = this.x;
		this.oy = this.y;
		this.targetX = this.x-n;
		this.targetY = this.y-n;
		this.targetWidth = this.width+(2*n);
		this.targetHeight = this.height+(2*n);
		
		this.targetFillColor = this.processing.color(
			this.processing.red(this.fillColor),
			this.processing.green(this.fillColor),
			this.processing.blue(this.fillColor),
			0
		);
		
		this.targetStrokeColor = this.processing.color(
			this.processing.red(this.strokeColor/2),
			this.processing.green(this.strokeColor/2),
			this.processing.blue(this.strokeColor/2),
			0
		);


	}
});

Block.Width = 20;
Block.Height = 20;

Block.BlocksByType = {};
Block.registerBlock = function(block)
{
	Block.BlocksByType[block.Type] = block;
};

Block.createBlock = function(type, parent, data)
{
	var T = Block.BlocksByType[type];
	if(T)
	{
		return new T(parent, data);
	}
	
	return null;
}

module.exports = Block;
