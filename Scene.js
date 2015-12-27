var GameObject = require('./GameObject');
var Block = require('./Block');
var RedBlock = require('./RedBlock');
var GreenBlock = require('./GreenBlock');
var BlueBlock = require('./BlueBlock');
var BrownBlock = require('./BrownBlock');
var WhiteBlock = require('./WhiteBlock');
var YellowBlock = require('./YellowBlock');
var OrangeBlock = require('./OrangeBlock');

///////////////////////////////////////////////////////////////////////////////
// Scene
//
// A Scene contains GameObjects.
//
///////////////////////////////////////////////////////////////////////////////
var Scene = GameObject.extend({
	init: function(parent)
	{
		this._super(parent);
		this.logger.scope = "Scene";

		this.fillColor = this.processing.color(255,255,255);
		this.strokeColor = this.processing.color(0,0,0);
		
		this.targetX = this.x;
	},
		
	drawObject: function()
	{
	},
	
	placeBlock: function(x, y)
	{
		var go = null;
		
		// HACK
		console.log(this.parent.menu.selectedMenuItem.label);
		switch(this.parent.menu.selectedMenuItem.label)
		{
		case "Red":
			go = new RedBlock(this);
			break;
		case "Green":
			go = new GreenBlock(this);
			break;
		case "Blue":
			go = new BlueBlock(this);
			break;
		case "Brown":
			go = new BrownBlock(this);
			break;
		case "White":
			go = new WhiteBlock(this);
			break;
		case "Yellow":
			go = new YellowBlock(this);
			break;
		case "Orange":
			go = new OrangeBlock(this);
			break;
		default:
			go = new Block(this);
		}

		console.log(go);
		x = Math.round(x/go.width)*go.width;
		y = Math.round(y/go.height)*go.width;
		go.x = x-(go.width/2);
		go.y = y-(go.height/2);
		
		this.addChild(go);
	},
	
	update: function()
	{
		this._super();
		
		if(this.x != this.targetX)
		{
			this.x = this.processing.lerp(this.x, this.targetX, .2);
		}
	},
	
	
	mouseClicked: function(x, y)
	{
		// Use default implementation to check if any children will handle the mouseClick.
		if(this._super(x, y) == true)
		{
			return true;
		}

		this.logger.debug("no Scene children handled click. Placing block.")
		// No children handled the mouseClick, handle here.
		this.placeBlock(x-this.x, y-this.y);
		return true;
	},
	
	keyPressed: function()
	{
		if(this.processing.keyCode == 39)
		{
			this.targetX+=10;
		}
		else if(this.processing.keyCode == 37)
		{
			this.targetX-=10;
		}
	}
	
});

module.exports = Scene;
