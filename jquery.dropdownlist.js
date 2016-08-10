(function ($) {
    //jQuery扩展
    $.fn.extend({
        //多级级联下拉菜单
        multiDropDownList: function (options) {

            //参数默认设置
            var defaults = {
            	initText: '    ',
            	isShowInBlock: false,
                data: {},
                callback: function () {
                    return false;
                }
            };

            var options = $.extend({}, defaults, options);

            var showall = function (menu_list, parent) {
            	if(menu_list instanceof Array){
            		for (var menu in menu_list) {
                        if (menu_list[menu].children.length > 0) {
                            var li = $("<li></li>").addClass('dropdown-submenu')
                                .attr('data-id', menu_list[menu].id);
                            var a = $('<a href="javascript:;"></a>').append(menu_list[menu].text);
                            $(li).append(a).append('<ul class="dropdown-menu"></ul>').appendTo(parent);
                            showall(menu_list[menu].children, $(li).find('ul').eq(0));
                        }
                        else {
                            var a = $('<a href="javascript:;"></a>').append(menu_list[menu].text);
                            $("<li></li>").attr('data-id', menu_list[menu].id).append(a).appendTo(parent);
                        }
                    }
            	} else {
            		if (menu_list.children.length > 0) {
                        var li = $("<li></li>").addClass('dropdown-submenu')
                            .attr('data-id', menu_list.id);
                        var a = $('<a href="javascript:;"></a>').append(menu_list.text);
                        $(li).append(a).append('<ul class="dropdown-menu"></ul>').appendTo(parent);
                        showall(menu_list.children, $(li).find('ul').eq(0));
                    }
                    else {
                        var a = $('<a href="javascript:;"></a>').append(menu_list.text);
                        $("<li></li>").attr('data-id', menu_list.id).append(a).appendTo(parent);
                    }
            	}      
            };

            return this.each(function () {
                var o = options;
                var $this = $(this);
                if (o.data) {
                    var button = $('<button></button>')
                        .addClass('btn btn-primary btn-xs dropdown-toggle')
                        .attr({ 'type': 'button', 'data-toggle': 'dropdown' })
                        .append('<span>' + o.initText + '</span>&nbsp;<span class="caret"></span>');
                    
                    var dropUl = $('<ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu"></ul>');

                    showall(o.data, dropUl);

                    var dropListDiv = $('<div></div>').addClass('btn-group').append(button).append(dropUl);

                    $this.html('').append(dropListDiv);

                    $($this).find('li').each(function () {
                        $(this).bind('click', function () {
                            var button = $(this).parents('.btn-group').find('button');
                            var text = $(this).find('a').eq(0).text();
                            var pid = $(this).attr('data-id');
                            if(o.isShowInBlock) {
                            	button.find('span').eq(0).text(text);
                            }
                            o.callback(pid, text);
                            button.click();
                            event.stopPropagation();
                            return false;
                        });
                    });
                } else {
                    return false;
                }
            });
        }
    });
}(jQuery));