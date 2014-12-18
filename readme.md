Padawan.js
==========
(Published under MIT License)

Simple, extensible tooltip library
	
	new Padawan(target, message[, options]);
	new Padawan(target[, options]);
	new Padawan(options);

![Padawan.js](https://hostr.co/file/BnGRX5gNKzis/padawan.png)

**Example Usage:**

	var info = new Padawan(document.getElementById("myElement"), "Here's my message!");
	info.observe();
	
Or you can customize the `Padawan` with a third "options" argument:

	var info = new Padawan(document.getElementById("myElement"), "Here's my message!", {
		style: {
			backgroundColor: "red"
		}
	});
	info.observe();

*Preferred Method:* Or you can pput all arguments in an object:

	var info = new Padawan({
		target: document.getElementById("myElement"),
		message: "Here's my message!",
		style: {
			backgroundColor: "red"
		}
	});
	info.observe();

You can also attach a tooltip by applying a `data-padawan` attribute, like so:

	<a href="#" data-padawan="Here's my message!">Hover Me</a>
	
However, customizing is far easier to do in javascript, so this isn't the preferred method (though, maybe the fastest to apply).

**Example Plugin:**

	Padawan.api.___ = function(___) {
		// will fill in more info here later
	};
	
	var info = new Padawan({
		___: "___"
	});
	info.observe();

**This is a work in progress!**