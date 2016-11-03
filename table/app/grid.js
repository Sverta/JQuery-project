/**
 * Created by user on 12.10.16.
 */

(function ($) {
    $.widget("custom.grid", {
        options: {
            src:  'grid.json',
            style: 'classic',
            value: ''
        },

        _create: function () {
            this.element.addClass(this.options.style);
            var self = this;
            var table = $('<table class="tbl">');
            $.getJSON(this.options.src, function (data) {
                var eTable  = $("<tbody>");
                var eHeader = $('<thead>');
                $.each(data,function(index, row){
                    var tr = $('<tr>');
                      $.each(row, function (key, value) {
                          if (value.type == 'Label') {
                              tr.append($('<td>').gridCellLabel(value));
                          } else if(value.type == 'Edit') {
                              tr.append($('<td>').gridCellEdit(value));
                          }else if(value.type == 'Date') {
                              tr.append($('<td>').gridCellDate(value));
                          }
                          else if(value.type == 'header') {
                              tr.append($('<th>').gridCellHeader(Object.assign({},value,{
                                   onSort: self.onSort.bind(this)

                              })));
                          }
                      });
                    if (index === 0) {
                        eHeader.append(tr);
                    } else {
                        eTable.append(tr);
                    }
                });

                table.append(eHeader).append(eTable);
                $('div').html(table);
            });
        },
        onSort: function (cell, order) {
            var colIndex = cell.closest('tr').children().index(cell);
            var mylist = $('tbody');
            var listitems = $('tbody').find('tr');
            if (order === 'up') {
                listitems.sort(function (a, b) {
                    var $a = $(a).find("td:eq(" + colIndex + ")");
                    var $b =  $(b).find("td:eq(" + colIndex + ")");
                    var vc, vc1;

                    if ($a.attr('data-type') === 'Label') {
                        vc = $a.gridCellLabel("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                    }
                    else if ($a.attr('data-type') === 'Date') {
                        vc = $a.gridCellDate("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }
                    }
                    else if ($a.attr('data-type') === 'Edit') {
                        vc = $a.gridCellEdit("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }
                    }

                    var compA = vc;
                    var compB = vc1;
                    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;

                });
                $.each(listitems, function (idx, itm) {
                    mylist.append(itm);
                });


             }
            if (order === 'down') {

                listitems.sort(function (a, b) {
                    var $a = $(a).find("td:eq(" + colIndex + ")");
                    var $b =  $(b).find("td:eq(" + colIndex + ")");
                    var vc, vc1;

                    if ($a.attr('data-type') === 'Label') {
                        vc = $a.gridCellLabel("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                    }
                    else if ($a.attr('data-type') === 'Date') {
                        vc = $a.gridCellDate("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }

                    }
                    else if ($a.attr('data-type') === 'Edit') {
                        vc = $a.gridCellEdit("getValue").toUpperCase();
                        if ($b.attr('data-type') === 'Date') {
                            vc1 = $b.gridCellDate("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Edit') {
                            vc1 = $b.gridCellEdit("getValue").toUpperCase();
                        }
                        else if ($b.attr('data-type') === 'Label') {
                            vc1 = $b.gridCellLabel("getValue").toUpperCase();
                        }
                    }

                    var compA = vc;
                    var compB = vc1;
                    return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;

                });
                $.each(listitems, function (idx, itm) {
                    mylist.append(itm);
                });


            }
        }
    });

    $.widget( "custom.gridCell", {

        options: {
            type: null,
            value: ''
        },

        _create: function() {
            this.element.attr('data-type',this.options.type);
            this.refresh();
        },

        getValue: function() {
            return this.options.value;
        },

        setValue: function(newValue) {
            this.options.value = newValue;
            this.refresh();
        },

        refresh: function () {
            this.element.text(this.options.value);
        }

    });

    $.widget( "custom.gridCellDate", $.custom.gridCell,{
        options: {
            type: null,
            value: '',
            typeView: "ISO"
        },
        _create: function() {
         //   this.element.attr('data-type','date');
            //this.options.value = new Date(parseInt(this.options.value));
            return this._super();
        },
        refresh: function () {
            if (this.options.typeView === "string") {
                this.element.text((new Date(+this.options.value)).toString());
            }
            else if (this.options.typeView === "GMT") {
                this.element.text((new Date(+this.options.value)).toGMTString());
            }
            else if (this.options.typeView === "ISO") {
                this.element.text((new Date(+this.options.value)).toISOString());
            }
        }
    });

    $.widget("custom.gridCellLabel", $.custom.gridCell,{
        _create: function() {
            this._super();
        }
    });

    $.widget("custom.gridCellHeader",  $.custom.gridCell, {
        options: {
            onSort: null
        },

        _create:function () {
            var self = this;
            this.element.attr('data-type','header');
            this.arrowUp = $("<a href='#' class='button_header'>&#9660;</a>");
            this.arrowDown = $("<a href='#' class='button_header2'>&#9650;</a>");

            this.arrowUp.on('click', function(){
                if (typeof self.options.onSort === 'function') {
                    self.options.onSort(self.element,'up');
                }
            });

            this.arrowDown.on('click', function(){
                if (typeof self.options.onSort === 'function') {
                    self.options.onSort(self.element,'down');
                }
            });
            return this._super();
        },
        refresh: function() {
            this.element.text(this.options.value);
            this.element.append(this.arrowUp).append(this.arrowDown);
        }
    });

    $.widget("custom.gridCellEdit", $.custom.gridCell, {

        _create:function () {
            this.element.append('<a href="#" class="tbl_td">' +this.options.value+ '</a>');
          //  this.element.attr('data-type','edit');
            this._replace();
            return this._super();
        },

        _replace: function () {
            $( document ).ajaxComplete(function() {
                $(".tbl_td ").each(function () {
                    var label = $(this).text();
                    var text;
                    $(this).on('click', function () {
                        text = $(this).parent().gridCellEdit('getValue');
                        $(this).html("<input type='text' id = 'total' placeholder="+label+">");

                        $(this).find('input').focus();
                        $('input').on('blur', function () {
                            if ($('input').val() ) {
                                $(this).parent().html($('input').val());
                            }     else {
                                $(this).parent().html(label);
                            }
                        });
                        $(this).on('keyup', function () {
                            if ((event.keyCode === 13) && ($('input').val())){
                                $(this).html($('input').val());
                            }     else if(($('input').val()) == 0) {
                                $(this).html(label);
                            }
                        })
                    });
                });
            })
        },
        setValue: function(newValue) {
            this.element.children().text(newValue);
        }
    });

    $('div').grid();

})(jQuery);

