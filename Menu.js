var GameObject = require('./GameObject');
var Log = require('./Log');


///////////////////////////////////////////////////////////////////////////////
// Menu
//
// A Menu
//
///////////////////////////////////////////////////////////////////////////////
var Menu = GameObject.extend({
	init: function(parent)
	{
		this._super(parent);
		this.logger.scope = "Menu";
		
		this.height = this.processing.height;
		this.width = 120;
		this.x = this.processing.width - this.width;
		this.targetX = this.x;
		this.y = 0;
		this.isOpen = true;

		this.selectedMenuItem = null;
		var item = this.addMenuItem("Red", this.processing.color(255, 0, 0), null);
		this.addMenuItem("Green", this.processing.color(0, 255, 0), null);
		this.addMenuItem("Blue", this.processing.color(0, 0, 255), null);
		this.addMenuItem("Brown", this.processing.color(139, 69, 19), null);
		this.addMenuItem("White", this.processing.color(255, 255, 255), null);
		this.addMenuItem("Yellow", this.processing.color(255, 255, 0), null);
		this.addMenuItem("Orange", this.processing.color(255, 140, 0), null);
		this.selectMenuItem(item);

		this.handle = new MenuHandle(this);
		this.handle.x = 0;
		this.handle.y = 0;
		this.addChild(this.handle);
		
	},

	addMenuItem: function(label, action)
	{
		var item = new MenuItem(this, label, action);
		item.y = 10 + this.children.length * (item.height + 10);
		item.x = (this.width - item.width)-8;
		
		this.addChild(item);
		return item;
	},
	
	drawObject: function()
	{
		this.processing.stroke(0, 0, 0);
		this.processing.fill(100, 100, 100);
		this.processing.rect(0, 0, this.width, this.height);
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
		if(this._super(x,y))
		{
			return true;
		}
		if(this.userInteractionEnabled && this.containsPoint(x, y))
		{
			return true;
		}
		return false;
	},
	
	selectMenuItem: function(menuItem)
	{
		if(this.selectedMenuItem != null)
		{
			this.selectedMenuItem.isSelected = false;
		}

		this.selectedMenuItem = menuItem;
		this.selectedMenuItem.isSelected = true;
	},
	
	toggleMenu: function()
	{
		if(this.isOpen)
		{
			this.isOpen = false;
			this.targetX = this.processing.width - this.handle.width;
		}
		else
		{
			this.isOpen = true;
			this.targetX = this.processing.width - this.width;
		}
	}
	
});



///////////////////////////////////////////////////////////////////////////////
// MenuHandle
//
//
///////////////////////////////////////////////////////////////////////////////
var MenuHandle = GameObject.extend({
	init: function(parent)
	{
		this._super(parent);
		this.font = this.processing.loadFont("Arial.ttf"); 
		this.label = "Items";
		this.width = 25;
		this.height = parent.height;
	},

	drawObject: function()
	{
		this.processing.stroke(0, 0, 0);
		this.processing.fill(200, 200, 200);
		this.processing.rect(0, 0, this.width, this.height);

		this.processing.pushMatrix();
		this.processing.translate(0, 40);
		this.processing.rotate(this.processing.radians(-90));
		this.processing.textFont(this.font);
		this.processing.textAlign(this.processing.CENTER, this.processing.CENTER);
		this.processing.fill(0, 0, 0);
		this.processing.text(this.label, 0, 0, this.width, 20);
		this.processing.popMatrix();
	},

	mouseClicked: function(x, y)
	{
		this.logger.debug("MenuHandle mouseClicked");
		if(this.userInteractionEnabled && this.containsPoint(x,y))
		{
			this.logger.debug(this.label + " clicked");
			this.parent.toggleMenu();
			return true;
		}
		
		return false;
	}
});


///////////////////////////////////////////////////////////////////////////////
// MenuItem
//
//
///////////////////////////////////////////////////////////////////////////////
var MenuItem = GameObject.extend({
	init: function(parent, label, color, action)
	{
		this._super(parent);
		this.font = this.processing.loadFont("Arial.ttf"); 
		this.color = color;
		this.label = label;
		this.width = 80;
		this.height = this.width;
		this.isSelected = false;
	},


	drawObject: function()
	{
		this.processing.fill(this.color);
		if(this.isSelected == true)
		{
			this.processing.stroke(255, 255, 255);
		}
		else
		{
			this.processing.stroke(0, 0, 0);
		}
		
		this.processing.rect(0, 0, this.width, this.height);
		this.processing.textFont(this.font);
		this.processing.textAlign(this.processing.CENTER, this.processing.CENTER);
		this.processing.fill(255, 255, 255);
		this.processing.text(this.label, 0, 0, this.width, this.height);
	},

	mouseClicked: function(x, y)
	{
		this.logger.debug("MenuItem mouseClicked");
		if(this.userInteractionEnabled && this.containsPoint(x,y))
		{
			this.logger.debug(this.label + " clicked");
			this.parent.selectMenuItem(this);
			return true;
		}
		
		return false;
	}
});



module.exports = {};
module.exports.Menu = Menu;
module.exports.MenuItem = MenuItem;
