/**
** Util
** Author:别怀山
*/

//* is *//
function is_boolean(o){
	return (typeof(o) == 'boolean') || (o instanceof Boolean);
}
function is_number(o){
	return (typeof(o) == 'number') || (o instanceof Number);
}
function is_string(o){
	return (typeof(o) == 'string') || (o instanceof String);
}
function is_function(o){
	return (typeof(o) == 'function') || (o instanceof Function);
}
function is_regexp(o){
	return o instanceof RegExp;
}
function is_undefined(o){
	return typeof(o) == 'undefined';
}
function is_object(o){
	return (typeof(o) == 'object') || (o instanceof Object);
}

