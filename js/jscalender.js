var jsCalendar = function() {
    function c() {
        0 !== arguments.length && this._construct(arguments)
    }
    c.version = "v1.4.4";
    c.prototype._construct = function(a) {
        a = this._parseArguments(a);
        this._setTarget(a.target);
        this._init(a.options);
        this._initTarget();
        this._setDate(null !== a.date ? a.date : this._target.dataset.hasOwnProperty("date") ? this._target.dataset.date : new Date);
        if (!this._now) throw Error("jsCalendar: Date is outside range.");
        this._create();
        this._update()
    };
    c.prototype.languages = {
        en: {
            months: "January February March April May June July August September October November December".split(" "),
            days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            _dateStringParser: function(a, b) {
                return c._defaultDateStringParser(a, b, this)
            },
            _dayStringParser: function(a, b) {
                return c._defaultDayStringParser(a, b, this)
            }
        }
    };
    c.prototype._init = function(a) {
        this._elements = {};
        this._events = {};
        this._events.date = [];
        this._events.month = [];
        this._events.day_render = [];
        this._events.date_render = [];
        this._events.month_render = [];
        this._date = this._now = null;
        this._selected = [];
        this.language = {};
        this._parseOptions(a)
    };
    c.prototype._parseArguments = function(a) {
        var b = {
            target: null,
            date: null,
            options: {}
        };
        if (0 === a.length) throw Error("jsCalendar: No parameters were given.");
        if (1 === a.length)
            if (("object" === typeof HTMLElement ? a[0] instanceof HTMLElement : a[0]) && "object" === typeof a[0] && null !== a[0] && 1 === a[0].nodeType && "string" === typeof a[0].nodeName || "string" === typeof a[0]) b.target = a[0];
            else {
                b.options = a[0];
                if ("undefined" !== typeof a[0].target) b.target = a[0].target;
                else throw Error("jsCalendar: Not target was given.");
                "undefined" !==
                typeof a[0].date && (b.date = a[0].date)
            }
        else b.target = a[0], 2 <= a.length && (b.date = a[1]), 3 <= a.length && (b.options = a[2]);
        return b
    };
    c.options = {
        language: "en",
        zeroFill: !1,
        monthFormat: "month",
        dayFormat: "D",
        firstDayOfTheWeek: 1,
        navigator: !0,
        navigatorPosition: "both",
        min: !1,
        max: !1,
        onMonthRender: !1,
        onDayRender: !1,
        onDateRender: !1
    };
    c.prototype._parseOptions = function(a) {
        this._options = {};
        var b = {},
            d;
        for (d in c.options) c.options.hasOwnProperty(d) && (this._options[d] = c.options[d]), a.hasOwnProperty(d) ? b[d] = a[d] : this._target.dataset.hasOwnProperty(d) &&
            (b[d] = this._target.dataset[d]);
        "undefined" !== typeof b.zeroFill && (this._options.zeroFill = "false" !== b.zeroFill && b.zeroFill ? !0 : !1);
        "undefined" !== typeof b.monthFormat && (this._options.monthFormat = b.monthFormat);
        "undefined" !== typeof b.dayFormat && (this._options.dayFormat = b.dayFormat);
        "undefined" !== typeof b.navigator && (this._options.navigator = "false" !== b.navigator && b.navigator ? !0 : !1);
        "undefined" !== typeof b.navigatorPosition && (this._options.navigatorPosition = b.navigatorPosition);
        "string" === typeof b.language &&
        "undefined" !== typeof this.languages[b.language] && (this._options.language = b.language);
        this.setLanguage(this._options.language);
        "undefined" !== typeof b.fdotw && (b.firstDayOfTheWeek = b.fdotw);
        if ("undefined" !== typeof b.firstDayOfTheWeek && ("number" === typeof b.firstDayOfTheWeek && 1 <= b.firstDayOfTheWeek && 7 >= b.firstDayOfTheWeek && (this._options.firstDayOfTheWeek = b.firstDayOfTheWeek), "string" === typeof b.firstDayOfTheWeek))
            if (b.firstDayOfTheWeek.match(/^[1-7]$/)) this._options.firstDayOfTheWeek = parseInt(b.firstDayOfTheWeek,
                10);
            else if (this._options.firstDayOfTheWeek = this.language.days.indexOf(b.firstDayOfTheWeek) + 1, 1 > this._options.firstDayOfTheWeek || 7 < this._options.firstDayOfTheWeek) this._options.firstDayOfTheWeek = 1;
        "undefined" !== typeof b.min && "false" !== b.min && !1 !== b.min && (this._options.min = e.parseDate(b.min));
        "undefined" !== typeof b.max && "false" !== b.max && !1 !== b.max && (this._options.max = e.parseDate(b.max));
        "undefined" !== typeof b.onMonthRender && ("string" === typeof b.onMonthRender && "function" === typeof window[b.onMonthRender] ?
            this._on("month_render", window[b.onMonthRender]) : "function" === typeof b.onMonthRender && this._on("month_render", b.onMonthRender));
        "undefined" !== typeof b.onDayRender && ("string" === typeof b.onDayRender && "function" === typeof window[b.onDayRender] ? this._on("day_render", window[b.onDayRender]) : "function" === typeof b.onDayRender && this._on("day_render", b.onDayRender));
        "undefined" !== typeof b.onDateRender && ("string" === typeof b.onDateRender && "function" === typeof window[b.onDateRender] ? this._on("date_render", window[b.onDateRender]) :
            "function" === typeof b.onDateRender && this._on("date_render", b.onDateRender))
    };
    c.prototype._setTarget = function(a) {
        if (a = e.getElement(a)) this._target = a, (a = this._target.id) && 0 < a.length && (f["#" + a] = this);
        else throw Error("jsCalendar: Target was not found.");
    };
    c.prototype._initTarget = function() {
        0 < this._target.className.length && (this._target.className += " ");
        this._target.className += "jsCalendar";
        this._elements.table = document.createElement("table");
        this._elements.head = document.createElement("thead");
        this._elements.table.appendChild(this._elements.head);
        this._elements.body = document.createElement("tbody");
        this._elements.table.appendChild(this._elements.body);
        this._target.appendChild(this._elements.table)
    };
    c.prototype._isDateInRange = function(a) {
        if (!1 === this._options.min && !1 === this._options.max) return !0;
        a = e.parseDate(a);
        return !1 !== this._options.min && this._options.min.getTime() > a.getTime() || !1 !== this._options.max && this._options.max.getTime() < a.getTime() ? !1 : !0
    };
    c.prototype._setDate = function(a) {
        a = e.parseDate(a);
        this._isDateInRange(a) && (this._now = a, this._date =
            new Date(this._now.getFullYear(), this._now.getMonth(), 1))
    };
    c.prototype._parseToDateString = function(a, b) {
        var d = this.language;
        return b.replace(/(MONTH|month|MMM|mmm|mm|m|MM|M|DAY|day|DDD|ddd|dd|d|DD|D|YYYY|yyyy)/g, function(b) {
            return d.dateStringParser(b, a)
        })
    };
    c.prototype._getVisibleMonth = function(a) {
        a = "undefined" === typeof a ? this._date : e.parseDate(a);
        var b = new Date(a.getTime());
        b.setDate(1);
        var d = b.getDay() - (this._options.firstDayOfTheWeek - 1);
        0 > d && (d += 7);
        var c = this.language,
            h = this._options.monthFormat.replace(/(MONTH|month|MMM|mmm|##|#|YYYY|yyyy)/g,
                function(a) {
                    return c.dateStringParser(a, b)
                });
        a = this._getVisibleDates(a);
        var f = (new Date(b.getYear() + 1900, b.getMonth() + 1, 0)).getDate(),
            g = -1;
        b.getYear() === this._now.getYear() && b.getMonth() === this._now.getMonth() && (g = d + this._now.getDate() - 1);
        return {
            name: h,
            days: a,
            start: d + 1,
            current: g,
            end: d + f
        }
    };
    c.prototype._getVisibleDates = function(a) {
        a = "undefined" === typeof a ? this._date : e.parseDate(a);
        var b = [],
            d = new Date(a.getTime());
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
        var c = d.getDay() - (this._options.firstDayOfTheWeek - 1);
        0 > c && (c += 7);
        for (a = new Date(d.getTime()); 0 < c;) a.setDate(a.getDate() - 1), b.unshift(new Date(a.getTime())), c--;
        a = new Date(d.getTime());
        do b.push(new Date(a.getTime())), a.setDate(a.getDate() + 1); while (1 !== a.getDate());
        for (d = 42 - b.length; 0 < d;) b.push(new Date(a.getTime())), a.setDate(a.getDate() + 1), d--;
        return b
    };
    c.prototype._create = function() {
        var a, b, d = this;
        this._elements.created = !0;
        this._elements.headRows = [];
        for (a = 0; 2 > a; a++) this._elements.headRows.push(document.createElement("tr")), this._elements.head.appendChild(this._elements.headRows[a]);
        a = document.createElement("th");
        a.setAttribute("colspan", 7);
        this._elements.headRows[0].className = "jsCalendar-title-row";
        this._elements.headRows[0].appendChild(a);
        this._elements.headLeft = document.createElement("div");
        this._elements.headLeft.className = "jsCalendar-title-left";
        a.appendChild(this._elements.headLeft);
        this._elements.month = document.createElement("div");
        this._elements.month.className = "jsCalendar-title-name";
        a.appendChild(this._elements.month);
        this._elements.headRight = document.createElement("div");
        this._elements.headRight.className = "jsCalendar-title-right";
        a.appendChild(this._elements.headRight);
        this._options.navigator && (this._elements.navLeft = document.createElement("div"), this._elements.navLeft.className = "jsCalendar-nav-left", this._elements.navRight = document.createElement("div"), this._elements.navRight.className = "jsCalendar-nav-right", "left" === this._options.navigatorPosition ? (this._elements.headLeft.appendChild(this._elements.navLeft), this._elements.headLeft.appendChild(this._elements.navRight)) :
            ("right" === this._options.navigatorPosition ? this._elements.headRight.appendChild(this._elements.navLeft) : this._elements.headLeft.appendChild(this._elements.navLeft), this._elements.headRight.appendChild(this._elements.navRight)), this._elements.navLeft.addEventListener("click", function(a) {
            d.previous();
            var b = new Date(d._date.getTime());
            b.setDate(1);
            d._eventFire("month", b, a)
        }, !1), this._elements.navRight.addEventListener("click", function(a) {
            d.next();
            var b = new Date(d._date.getTime());
            b.setDate(1);
            d._eventFire("month",
                b, a)
        }, !1));
        this._elements.headRows[1].className = "jsCalendar-week-days";
        a.className = "jsCalendar-title";
        this._elements.days = [];
        for (a = 0; 7 > a; a++) this._elements.days.push(document.createElement("th")), this._elements.headRows[1].appendChild(this._elements.days[this._elements.days.length - 1]);
        this._elements.bodyRows = [];
        this._elements.bodyCols = [];
        for (a = 0; 6 > a; a++)
            for (this._elements.bodyRows.push(document.createElement("tr")), this._elements.body.appendChild(this._elements.bodyRows[a]), b = 0; 7 > b; b++) this._elements.bodyCols.push(document.createElement("td")),
                this._elements.bodyRows[a].appendChild(this._elements.bodyCols[7 * a + b]), this._elements.bodyCols[7 * a + b].addEventListener("click", function(a) {
                return function(b) {
                    d._eventFire("date", d._active[a], b)
                }
            }(7 * a + b), !1)
    };
    c.prototype._selectDates = function(a) {
        a = a.slice();
        for (var b = 0; b < a.length; b++) a[b] = e.parseDate(a[b]), a[b].setHours(0, 0, 0, 0), a[b] = a[b].getTime();
        for (b = a.length - 1; 0 <= b; b--) 0 > this._selected.indexOf(a[b]) && this._selected.push(a[b])
    };
    c.prototype._unselectDates = function(a) {
        a = a.slice();
        for (var b = 0; b < a.length; b++) a[b] =
            e.parseDate(a[b]), a[b].setHours(0, 0, 0, 0), a[b] = a[b].getTime();
        for (b = a.length - 1; 0 <= b; b--) {
            var d = this._selected.indexOf(a[b]);
            0 <= d && this._selected.splice(d, 1)
        }
    };
    c.prototype._unselectAllDates = function() {
        for (; this._selected.length;) this._selected.pop()
    };
    c.prototype._update = function() {
        var a = this._getVisibleMonth(this._date);
        this._active = a.days.slice();
        this._elements.month.textContent = a.name;
        for (var b = this._options.zeroFill ? "0" : "", d, c = a.days.length - 1; 0 <= c; c--) d = a.days[c].getDate(), this._elements.bodyCols[c].textContent =
            10 > d ? b + d : d, 0 <= this._selected.indexOf(a.days[c].getTime()) ? this._elements.bodyCols[c].className = "jsCalendar-selected" : this._elements.bodyCols[c].removeAttribute("class");
        for (c = 0; c < a.start - 1; c++) this._elements.bodyCols[c].className = "jsCalendar-previous";
        0 <= a.current && (this._elements.bodyCols[a.current].className = 0 < this._elements.bodyCols[a.current].className.length ? this._elements.bodyCols[a.current].className + " jsCalendar-current" : "jsCalendar-current");
        for (c = a.end; c < a.days.length; c++) this._elements.bodyCols[c].className =
            "jsCalendar-next";
        for (c = 0; 7 > c; c++) {
            var e = this;
            this._elements.days[c].textContent = this._options.dayFormat.replace(/(DAY|day|DDD|ddd|DD|dd|D)/g, function(a) {
                return e.language.dayStringParser(a, (c + e._options.firstDayOfTheWeek - 1) % 7)
            })
        }
        if (0 < this._events.month_render.length)
            for (d = a.days[a.start], this._elements.month.removeAttribute("style"), b = 0; b < this._events.month_render.length; b++) this._events.month_render[b].call(this, d.getMonth(), this._elements.month, {
                start: new Date(d.getTime()),
                end: new Date(d.getFullYear(),
                    d.getMonth() + 1, 0, 23, 59, 59, 999),
                numberOfDays: a.end - a.start + 1
            });
        if (0 < this._events.day_render.length)
            for (c = 0; 7 > c; c++)
                for (this._elements.days[c].removeAttribute("style"), b = 0; b < this._events.day_render.length; b++) this._events.day_render[b].call(this, (c + this._options.firstDayOfTheWeek - 1) % 7, this._elements.days[c], {
                    position: c
                });
        if (0 < this._events.date_render.length)
            for (c = 0; c < a.days.length; c++)
                for (this._elements.bodyCols[c].removeAttribute("style"), b = 0; b < this._events.date_render.length; b++) this._events.date_render[b].call(this,
                    new Date(a.days[c].getTime()), this._elements.bodyCols[c], {
                        isCurrent: a.current == c,
                        isSelected: 0 <= this._selected.indexOf(a.days[c].getTime()),
                        isPreviousMonth: c < a.start,
                        isCurrentMonth: a.start <= c && c <= a.end,
                        isNextMonth: a.end < c,
                        position: {
                            x: c % 7,
                            y: Math.floor(c / 7)
                        }
                    })
    };
    c.prototype._eventFire = function(a, b, c) {
        if (this._events.hasOwnProperty(a))
            for (var d = 0; d < this._events[a].length; d++)(function(a, d) {
                setTimeout(function() {
                    a.call(d, c, new Date(b.getTime()))
                }, 0)
            })(this._events[a][d], this)
    };
    c.prototype._on = function(a,
                               b) {
        if ("function" === typeof b) this._events[a].push(b);
        else throw Error("jsCalendar: Invalid callback function.");
        return this
    };
    c.prototype.onDateClick = function(a) {
        return this._on("date", a)
    };
    c.prototype.onMonthChange = function(a) {
        return this._on("month", a)
    };
    c.prototype.onDayRender = function(a) {
        return this._on("day_render", a)
    };
    c.prototype.onDateRender = function(a) {
        return this._on("date_render", a)
    };
    c.prototype.onMonthRender = function(a) {
        return this._on("month_render", a)
    };
    c.prototype.set = function(a) {
        this._setDate(a);
        this.refresh();
        return this
    };
    c.prototype.min = function(a) {
        this._options.min = a ? e.parseDate(a) : !1;
        this.refresh();
        return this
    };
    c.prototype.max = function(a) {
        this._options.max = a ? e.parseDate(a) : !1;
        this.refresh();
        return this
    };
    c.prototype.refresh = function(a) {
        "undefined" !== typeof a && this._isDateInRange(a) && (this._date = e.parseDate(a));
        !0 === this._elements.created && this._update();
        return this
    };
    c.prototype.next = function(a) {
        "number" !== typeof a && (a = 1);
        a = new Date(this._date.getFullYear(), this._date.getMonth() + a, 1);
        if (!this._isDateInRange(a)) return this;
        this._date = a;
        this.refresh();
        return this
    };
    c.prototype.previous = function(a) {
        "number" !== typeof a && (a = 1);
        a = new Date(this._date.getFullYear(), this._date.getMonth() - a + 1, 0);
        if (!this._isDateInRange(a)) return this;
        this._date = a;
        this.refresh();
        return this
    };
    c.prototype["goto"] = function(a) {
        this.refresh(a);
        return this
    };
    c.prototype.reset = function() {
        this.refresh(this._now);
        return this
    };
    c.prototype.select = function(a) {
        if ("undefined" === typeof a) return this;
        a instanceof Array || (a = [a]);
        this._selectDates(a);
        this.refresh();
        return this
    };
    c.prototype.unselect = function(a) {
        if ("undefined" === typeof a) return this;
        a instanceof Array || (a = [a]);
        this._unselectDates(a);
        this.refresh();
        return this
    };
    c.prototype.clearselect = function() {
        this._unselectAllDates();
        this.refresh();
        return this
    };
    c.prototype.clearSelected = c.prototype.clearselect;
    c.prototype.getSelected = function(a) {
        "object" !== typeof a && (a = {});
        var b = this._selected.slice();
        a.sort && (!0 === a.sort ? b.sort() : "string" === typeof a.sort && ("asc" === a.sort.toLowerCase() ? b.sort() : "desc" === a.sort.toLowerCase() &&
            (b.sort(), b.reverse())));
        if (a.type && "string" === typeof a.type) {
            var c;
            if ("date" === a.type.toLowerCase())
                for (c = b.length - 1; 0 <= c; c--) b[c] = new Date(b[c]);
            else if ("timestamp" !== a.type.toLowerCase())
                for (c = b.length - 1; 0 <= c; c--) b[c] = this._parseToDateString(new Date(b[c]), a.type)
        }
        return b
    };
    c.prototype.isSelected = function(a) {
        if ("undefined" === typeof a || null === a) return !1;
        a = e.parseDate(a);
        a.setHours(0, 0, 0, 0);
        a = a.getTime();
        return 0 <= this._selected.indexOf(a) ? !0 : !1
    };
    c.prototype.isVisible = function(a) {
        if ("undefined" ===
            typeof a || null === a) return !1;
        a = e.parseDate(a);
        a.setHours(0, 0, 0, 0);
        a = a.getTime();
        var b = this._getVisibleDates();
        return b[0].getTime() <= a && b[b.length - 1].getTime() >= a ? !0 : !1
    };
    c.prototype.isInMonth = function(a) {
        if ("undefined" === typeof a || null === a) return !1;
        a = e.parseDate(a);
        a.setHours(0, 0, 0, 0);
        a.setDate(1);
        var b = e.parseDate(this._date);
        b.setHours(0, 0, 0, 0);
        b.setDate(1);
        return a.getTime() === b.getTime() ? !0 : !1
    };
    c.prototype.setLanguage = function(a) {
        if ("string" !== typeof a) throw Error("jsCalendar: Invalid language code.");
        if ("undefined" === typeof this.languages[a]) throw Error("jsCalendar: Language not found.");
        this._options.language = a;
        a = this.languages[a];
        this.language.months = a.months;
        this.language.days = a.days;
        this.language.dateStringParser = a._dateStringParser;
        this.language.dayStringParser = a._dayStringParser;
        this.refresh();
        return this
    };
    c.autoFind = function() {
        for (var a = document.getElementsByClassName("auto-jsCalendar"), b = 0; b < a.length; b++) "true" !== a[b].getAttribute("jsCalendar-loaded") && (a[b].setAttribute("jsCalendar-loaded",
            "true"), new c({
            target: a[b]
        }))
    };
    var e = c.tools = {};
    e.parseDate = function(a, b) {
        if ("undefined" === typeof a || null === a || "now" === a) a = new Date;
        else if ("string" === typeof a)
            if (a = a.replace(/-/g, "/").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4,4})$/i), null !== a) {
                var c = parseInt(a[2], 10) - 1;
                a = new Date(a[3], c, a[1]);
                if (!a || a.getMonth() !== c) {
                    if (!b) throw Error("jsCalendar: Date does not exist.");
                    return null
                }
            } else {
                if (!b) throw Error("jsCalendar: Failed to parse date.");
                return null
            }
        else if ("number" === typeof a) a = new Date(a);
        else if (!(a instanceof Date)) {
            if (!b) throw Error("jsCalendar: Invalid date.");
            return null
        }
        return new Date(a.getTime())
    };
    e.stringToDate = e.parseDate;
    e.dateToString = function(a, b, d) {
        var e = c.prototype.languages;
        d && e.hasOwnProperty(d) || (d = "en");
        return c.prototype._parseToDateString.apply({
            language: {
                months: e[d].months,
                days: e[d].days,
                dateStringParser: e[d]._dateStringParser,
                dayStringParser: e[d]._dayStringParser
            }
        }, [a, b])
    };
    e.getElement = function(a) {
        if (!a) return null;
        if ("string" === typeof a) {
            if ("#" === a[0]) return document.getElementById(a.substring(1));
            if ("." === a[0]) return document.getElementsByClassName(a.substring(1))[0]
        } else if (a.tagName && a.nodeName && a.ownerDocument && a.removeAttribute) return a;
        return null
    };
    c["new"] = function() {
        var a = new c;
        a._construct(arguments);
        return a
    };
    var f = {};
    c.set = function(a, b) {
        if (b instanceof c) return f[a] = b, !0;
        throw Error("jsCalendar: The second parameter is not a jsCalendar.");
    };
    c.get = function(a) {
        return f.hasOwnProperty(a) ? f[a] : null
    };
    c.del = function(a) {
        return f.hasOwnProperty(a) ? (delete f[a], !0) : !1
    };
    c.addLanguage = function(a) {
        if ("undefined" ===
            typeof a) throw Error("jsCalendar: No language object was given.");
        if ("string" !== typeof a.code) throw Error("jsCalendar: Invalid language code.");
        if (!(a.months instanceof Array)) throw Error("jsCalendar: Invalid language months.");
        if (12 !== a.months.length) throw Error("jsCalendar: Invalid language months length.");
        if (!(a.days instanceof Array)) throw Error("jsCalendar: Invalid language days.");
        if (7 !== a.days.length) throw Error("jsCalendar: Invalid language days length.");
        c.prototype.languages[a.code] = a;
        a._dateStringParser = a.hasOwnProperty("dateStringParser") ? function(b, d) {
            return a.dateStringParser(b, d) || c._defaultDateStringParser(b, d, a)
        } : function(b, d) {
            return c._defaultDateStringParser(b, d, a)
        };
        a._dayStringParser = a.hasOwnProperty("dayStringParser") ? function(b, d) {
            return a.dayStringParser(b, d) || c._defaultDayStringParser(b, d, a)
        } : function(b, d) {
            return c._defaultDayStringParser(b, d, a)
        }
    };
    c._defaultDateStringParser = function(a, b, c) {
        switch (a) {
            case "MONTH":
            case "month":
                return c.months[b.getMonth()];
            case "MMM":
            case "mmm":
                return c.months[b.getMonth()].substring(0,
                    3);
            case "mm":
                return c.months[b.getMonth()].substring(0, 2);
            case "m":
                return c.months[b.getMonth()].substring(0, 1);
            case "MM":
                return (9 > b.getMonth() ? "0" : "") + (b.getMonth() + 1);
            case "M":
                return b.getMonth() + 1;
            case "##":
                return (9 > b.getMonth() ? "0" : "") + (b.getMonth() + 1);
            case "#":
                return b.getMonth() + 1;
            case "DAY":
            case "day":
                return c.days[b.getDay()];
            case "DDD":
            case "ddd":
                return c.days[b.getDay()].substring(0, 3);
            case "dd":
                return c.days[b.getDay()].substring(0, 2);
            case "d":
                return c.days[b.getDay()].substring(0, 1);
            case "DD":
                return (9 >=
                b.getDate() ? "0" : "") + b.getDate();
            case "D":
                return b.getDate();
            case "YYYY":
            case "yyyy":
                return b.getYear() + 1900
        }
    };
    c._defaultDayStringParser = function(a, b, c) {
        switch (a) {
            case "DAY":
            case "day":
                return c.days[b];
            case "DDD":
            case "ddd":
                return c.days[b].substring(0, 3);
            case "DD":
            case "dd":
                return c.days[b].substring(0, 2);
            case "D":
                return c.days[b].substring(0, 1)
        }
    };
    (function() {
        if ("undefined" !== typeof window.jsCalendar_language2load) {
            for (; window.jsCalendar_language2load.length;) setTimeout(function(a) {
                    return function() {
                        c.addLanguage(a)
                    }
                }(window.jsCalendar_language2load.pop()),
                0);
            delete window.jsCalendar_language2load
        }
    })();
    window.addEventListener("load", function() {
        c.autoFind()
    }, !1);
    return c
}();