(function() {
    function f(n, t) {
        var i;
        n || (n = {});
        for (i in t) n[i] = t[i];
        return n
    }

    function o() {
        var t, n = arguments,
            r, i = {},
            u = function(n, t) {
                var r, i;
                typeof n != "object" && (n = {});
                for (i in t) t.hasOwnProperty(i) && (r = t[i], n[i] = r && typeof r == "object" && Object.prototype.toString.call(r) !== "[object Array]" && i !== "renderTo" && typeof r.nodeType != "number" ? u(n[i] || {}, r) : t[i]);
                return n
            };
        for (n[0] === !0 && (i = n[1], n = Array.prototype.slice.call(n, 2)), r = n.length, t = 0; t < r; t++) i = u(i, n[t]);
        return i
    }

    function h(n, t) {
        return parseInt(n, t || 10)
    }

    function tr(n) {
        return typeof n == "string"
    }

    function yt(n) {
        return n && typeof n == "object"
    }

    function ir(n) {
        return Object.prototype.toString.call(n) === "[object Array]"
    }

    function ni(n) {
        return typeof n == "number"
    }

    function wi(n) {
        return et.log(n) / et.LN10
    }

    function ti(n) {
        return et.pow(10, n)
    }

    function ii(n, t) {
        for (var i = n.length; i--;)
            if (n[i] === t) {
                n.splice(i, 1);
                break
            }
    }

    function i(n) {
        return n !== u && n !== null
    }

    function g(n, t, r) {
        var u, f;
        if (tr(t)) i(r) ? n.setAttribute(t, r) : n && n.getAttribute && (f = n.getAttribute(t));
        else if (i(t) && yt(t))
            for (u in t) n.setAttribute(u, t[u]);
        return f
    }

    function si(n) {
        return ir(n) ? n : [n]
    }

    function n() {
        for (var i = arguments, t, r = i.length, n = 0; n < r; n++)
            if (t = i[n], t !== u && t !== null) return t
    }

    function a(n, t) {
        gi && !vt && t && t.opacity !== u && (t.filter = "alpha(opacity=" + t.opacity * 100 + ")");
        f(n.style, t)
    }

    function ct(n, t, i, r, u) {
        return n = s.createElement(n), t && f(n, t), u && a(n, {
            padding: 0,
            border: ut,
            margin: 0
        }), i && a(n, i), r && r.appendChild(n), n
    }

    function ri(n, t) {
        var i = function() {
            return u
        };
        return i.prototype = new n, f(i.prototype, t), i
    }

    function bi(n, t, i, r) {
        var c = tt.numberFormat,
            e = nt.lang,
            u = +n || 0,
            o = t === -1 ? (u.toString().split(".")[1] || "").length : isNaN(t = p(t)) ? 2 : t,
            l = i === void 0 ? e.decimalPoint : i,
            e = r === void 0 ? e.thousandsSep : r,
            a = u < 0 ? "-" : "",
            f = String(h(u = p(u).toFixed(o))),
            s = f.length > 3 ? f.length % 3 : 0;
        return c !== bi ? c(n, t, i, r) : a + (s ? f.substr(0, s) + e : "") + f.substr(s).replace(/(\d{3})(?=\d)/g, "$1" + e) + (o ? l + p(u - f).toFixed(o).slice(2) : "")
    }

    function rr(n, t) {
        return Array((t || 2) + 1 - String(n).length).join(0) + n
    }

    function hr(n, t, i) {
        var r = n[t];
        n[t] = function() {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(r), i.apply(this, n)
        }
    }

    function ur(n, t) {
        for (var e = "{", s = !1, i, r, o, u, f, h = [];
            (e = n.indexOf(e)) !== -1;) {
            if (i = n.slice(0, e), s) {
                for (r = i.split(":"), o = r.shift().split("."), f = o.length, i = t, u = 0; u < f; u++) i = i[o[u]];
                r.length && (r = r.join(":"), o = /\.([0-9])/, u = nt.lang, f = void 0, /f$/.test(r) ? (f = (f = r.match(o)) ? f[1] : -1, i !== null && (i = bi(i, f, u.decimalPoint, r.indexOf(",") > -1 ? u.thousandsSep : ""))) : i = eu(r, i))
            }
            h.push(i);
            n = n.slice(e + 1);
            e = (s = !s) ? "}" : "{"
        }
        return h.push(n), h.join("")
    }

    function au(n) {
        return et.pow(10, ft(et.log(n) / et.LN10))
    }

    function vu(t, i, r, u) {
        var f, r = n(r, 1);
        for (f = t / r, i || (i = [1, 2, 2.5, 5, 10], u === !1 && (r === 1 ? i = [1, 2, 5, 10] : r <= .1 && (i = [1 / r]))), u = 0; u < i.length; u++)
            if (t = i[u], f <= (i[u] + (i[u + 1] || i[u])) / 2) break;
        return t * r
    }

    function yu(n, t) {
        for (var u = n.length, r, i = 0; i < u; i++) n[i].ss_i = i;
        for (n.sort(function(n, i) {
                return r = t(n, i), r === 0 ? n.ss_i - i.ss_i : r
            }), i = 0; i < u; i++) delete n[i].ss_i
    }

    function cr(n) {
        for (var t = n.length, i = n[0]; t--;) n[t] < i && (i = n[t]);
        return i
    }

    function ki(n) {
        for (var t = n.length, i = n[0]; t--;) n[t] > i && (i = n[t]);
        return i
    }

    function lr(n, t) {
        for (var i in n) n[i] && n[i] !== t && n[i].destroy && n[i].destroy(), delete n[i]
    }

    function ar(n) {
        fu || (fu = ct(er));
        n && fu.appendChild(n);
        fu.innerHTML = ""
    }

    function pt(n) {
        return parseFloat(n.toPrecision(14))
    }

    function vr(t, i) {
        vi = n(t, i.animation)
    }

    function ef() {
        var r = nt.global.useUTC,
            t = r ? "getUTC" : "get",
            i = r ? "setUTC" : "set";
        nr = nt.global.Date || window.Date;
        wr = (r && nt.global.timezoneOffset || 0) * 6e4;
        ou = r ? nr.UTC : function(t, i, r, u, f, e) {
            return new nr(t, i, n(r, 1), n(u, 0), n(f, 0), n(e, 0)).getTime()
        };
        ku = t + "Minutes";
        du = t + "Hours";
        gu = t + "Day";
        tu = t + "Date";
        su = t + "Month";
        hu = t + "FullYear";
        lf = i + "Minutes";
        af = i + "Hours";
        nf = i + "Date";
        vf = i + "Month";
        yf = i + "FullYear"
    }

    function it() {}

    function yr(n, t, i, r) {
        this.axis = n;
        this.pos = t;
        this.type = i || "";
        this.isNew = !0;
        i || r || this.addLabel()
    }

    function ui() {
        this.init.apply(this, arguments)
    }

    function kr() {
        this.init.apply(this, arguments)
    }

    function of(t, i, r, u, f) {
        var e = t.chart.inverted;
        this.axis = t;
        this.isNegative = r;
        this.options = i;
        this.x = u;
        this.total = null;
        this.points = {};
        this.stack = f;
        this.alignOptions = {
            align: i.align || (e ? r ? "left" : "right" : "center"),
            verticalAlign: i.verticalAlign || (e ? "middle" : r ? "bottom" : "top"),
            y: n(i.y, e ? 4 : r ? 14 : -6),
            x: n(i.x, e ? r ? -6 : 6 : 0)
        };
        this.textAlign = i.textAlign || (e ? r ? "right" : "left" : "center")
    }
    var u, s = document,
        k = window,
        et = Math,
        e = et.round,
        ft = et.floor,
        fr = et.ceil,
        r = et.max,
        l = et.min,
        p = et.abs,
        lt = et.cos,
        wt = et.sin,
        fi = et.PI,
        di = fi / 180,
        li = navigator.userAgent,
        sf = k.opera,
        gi = /msie/i.test(li) && !sf,
        uu = s.documentMode === 8,
        pu = /AppleWebKit/.test(li),
        pr = /Firefox/.test(li),
        hf = /(Mobile|Android|Windows Phone)/.test(li),
        ai = "http://www.w3.org/2000/svg",
        vt = !!s.createElementNS && !!s.createElementNS(ai, "svg").createSVGRect,
        wf = pr && parseInt(li.split("Firefox/")[1], 10) < 4,
        bt = !vt && !gi && !!s.createElement("canvas").getContext,
        dr, gr, cf = {},
        wu = 0,
        fu, nt, eu, vi, bu, c, dt, hi = function() {
            return u
        },
        ot = [],
        nu = 0,
        er = "div",
        ut = "none",
        bf = /^[0-9]+$/,
        kf = "stroke-width",
        nr, ou, wr, ku, du, gu, tu, su, hu, lf, af, nf, vf, yf, w = {},
        tt, d, at, rt, ei, ht, kt, pf, rf, oi, sr, ru, pi, v, gt;
    k.Highcharts ? dt(16, !0) : tt = k.Highcharts = {};
    eu = function(t, r, u) {
        if (!i(r) || isNaN(r)) return "Invalid date";
        var t = n(t, "%Y-%m-%d %H:%M:%S"),
            o = new nr(r - wr),
            s, h = o[du](),
            a = o[gu](),
            v = o[tu](),
            c = o[su](),
            y = o[hu](),
            l = nt.lang,
            p = l.weekdays,
            o = f({
                a: p[a].substr(0, 3),
                A: p[a],
                d: rr(v),
                e: v,
                b: l.shortMonths[c],
                B: l.months[c],
                m: rr(c + 1),
                y: y.toString().substr(2, 2),
                Y: y,
                H: rr(h),
                I: rr(h % 12 || 12),
                l: h % 12 || 12,
                M: rr(o[ku]()),
                p: h < 12 ? "AM" : "PM",
                P: h < 12 ? "am" : "pm",
                S: rr(o.getSeconds()),
                L: rr(e(r % 1e3), 3)
            }, tt.dateFormats);
        for (s in o)
            for (; t.indexOf("%" + s) !== -1;) t = t.replace("%" + s, typeof o[s] == "function" ? o[s](r) : o[s]);
        return u ? t.substr(0, 1).toUpperCase() + t.substr(1) : t
    };
    dt = function(n, t) {
        var i = "Highcharts error #" + n + ": www.highcharts.com/errors/" + n;
        if (t) throw i;
        k.console && console.log(i)
    };
    c = {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 26784e5,
        year: 31556952e3
    };
    bu = {
            init: function(n, t, i) {
                var t = t || "",
                    r = n.shift,
                    e = t.indexOf("C") > -1,
                    u = e ? 7 : 3,
                    f, t = t.split(" "),
                    i = [].concat(i),
                    o, s, h = function(n) {
                        for (f = n.length; f--;) n[f] === "M" && n.splice(f + 1, 0, n[f + 1], n[f + 2], n[f + 1], n[f + 2])
                    };
                if (e && (h(t), h(i)), n.isArea && (o = t.splice(t.length - 6, 6), s = i.splice(i.length - 6, 6)), r <= i.length / u && t.length === i.length)
                    for (; r--;) i = [].concat(i).splice(0, u).concat(i);
                if (n.shift = 0, t.length)
                    for (n = i.length; t.length < n;) r = [].concat(t).splice(t.length - u, u), e && (r[u - 6] = r[u - 2], r[u - 5] = r[u - 1]), t = t.concat(r);
                return o && (t = t.concat(o), i = i.concat(s)), [t, i]
            },
            step: function(n, t, i, r) {
                var f = [],
                    u = n.length;
                if (i === 1) f = r;
                else if (u === t.length && i < 1)
                    for (; u--;) r = parseFloat(n[u]), f[u] = isNaN(r) ? n[u] : i * parseFloat(t[u] - r) + r;
                else f = t;
                return f
            }
        },
        function(n) {
            k.HighchartsAdapter = k.HighchartsAdapter || n && {
                init: function(t) {
                    var i = n.fx;
                    n.extend(n.easing, {
                        easeOutQuad: function(n, t, i, r, u) {
                            return -r * (t /= u) * (t - 2) + i
                        }
                    });
                    n.each(["cur", "_default", "width", "height", "opacity"], function(t, r) {
                        var f = i.step,
                            e;
                        r === "cur" ? f = i.prototype : r === "_default" && n.Tween && (f = n.Tween.propHooks[r], r = "set");
                        (e = f[r]) && (f[r] = function(n) {
                            var i, n = t ? n : this;
                            if (n.prop !== "align") return i = n.elem, i.attr ? i.attr(n.prop, r === "cur" ? u : n.now) : e.apply(this, arguments)
                        })
                    });
                    hr(n.cssHooks.opacity, "get", function(n, t, i) {
                        return t.attr ? t.opacity || 0 : n.call(this, t, i)
                    });
                    this.addAnimSetter("d", function(n) {
                        var i = n.elem,
                            r;
                        n.started || (r = t.init(i, i.d, i.toD), n.start = r[0], n.end = r[1], n.started = !0);
                        i.attr("d", t.step(n.start, n.end, n.pos, i.toD))
                    });
                    this.each = Array.prototype.forEach ? function(n, t) {
                        return Array.prototype.forEach.call(n, t)
                    } : function(n, t) {
                        for (var r = n.length, i = 0; i < r; i++)
                            if (t.call(n[i], n[i], i, n) === !1) return i
                    };
                    n.fn.highcharts = function() {
                        var r = "Chart",
                            t = arguments,
                            n, i;
                        return this[0] && (tr(t[0]) && (r = t[0], t = Array.prototype.slice.call(t, 1)), n = t[0], n !== u && (n.chart = n.chart || {}, n.chart.renderTo = this[0], new tt[r](n, t[1]), i = this), n === u && (i = ot[g(this[0], "data-highcharts-chart")])), i
                    }
                },
                addAnimSetter: function(t, i) {
                    n.Tween ? n.Tween.propHooks[t] = {
                        set: i
                    } : n.fx.step[t] = i
                },
                getScript: n.getScript,
                inArray: n.inArray,
                adapterRun: function(t, i) {
                    return n(t)[i]()
                },
                grep: n.grep,
                map: function(n, t) {
                    for (var r = [], i = 0, u = n.length; i < u; i++) r[i] = t.call(n[i], n[i], i, n);
                    return r
                },
                offset: function(t) {
                    return n(t).offset()
                },
                addEvent: function(t, i, r) {
                    n(t).bind(i, r)
                },
                removeEvent: function(t, i, r) {
                    var u = s.removeEventListener ? "removeEventListener" : "detachEvent";
                    s[u] && t && !t[u] && (t[u] = function() {});
                    n(t).unbind(i, r)
                },
                fireEvent: function(t, i, r, u) {
                    var e = n.Event(i),
                        o = "detached" + i,
                        s;
                    !gi && r && (delete r.layerX, delete r.layerY, delete r.returnValue);
                    f(e, r);
                    t[i] && (t[o] = t[i], t[i] = null);
                    n.each(["preventDefault", "stopPropagation"], function(n, t) {
                        var i = e[t];
                        e[t] = function() {
                            try {
                                i.call(e)
                            } catch (n) {
                                t === "preventDefault" && (s = !0)
                            }
                        }
                    });
                    n(t).trigger(e);
                    t[o] && (t[i] = t[o], t[o] = null);
                    !u || e.isDefaultPrevented() || s || u(e)
                },
                washMouseEvent: function(n) {
                    var t = n.originalEvent || n;
                    return t.pageX === u && (t.pageX = n.pageX, t.pageY = n.pageY), t
                },
                animate: function(t, i, r) {
                    var f = n(t);
                    t.style || (t.style = {});
                    i.d && (t.toD = i.d, i.d = 1);
                    f.stop();
                    i.opacity !== u && t.attr && (i.opacity += "px");
                    t.hasAnim = 1;
                    f.animate(i, r)
                },
                stop: function(t) {
                    t.hasAnim && n(t).stop()
                }
            }
        }(k.jQuery);
    rt = k.HighchartsAdapter;
    d = rt || {};
    rt && rt.init.call(rt, bu);
    var cu = d.adapterRun,
        df = d.getScript,
        or = d.inArray,
        t = d.each,
        tf = d.grep,
        gf = d.offset,
        br = d.map,
        b = d.addEvent,
        st = d.removeEvent,
        y = d.fireEvent,
        ne = d.washMouseEvent,
        lu = d.animate,
        iu = d.stop,
        d = {
            enabled: !0,
            x: 0,
            y: 15,
            style: {
                color: "#606060",
                cursor: "default",
                fontSize: "11px"
            }
        };
    nt = {
        colors: "#47bac1,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            decimalPoint: ".",
            numericSymbols: "k,M,G,T,P,E".split(","),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com/4.0.4/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com/4.0.4/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#ebf1f5",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {
                theme: {
                    zIndex: 20
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        },
        title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            style: {
                color: "#333333",
                fontSize: "18px"
            }
        },
        subtitle: {
            text: "",
            align: "center",
            style: {
                color: "#555555"
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1e3
                },
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidthPlus: 1,
                            radiusPlus: 2
                        },
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: o(d, {
                    align: "center",
                    enabled: !1,
                    formatter: function() {
                        return this.y === null ? "" : bi(this.y, -1)
                    },
                    verticalAlign: "bottom",
                    y: 0
                }),
                cropThreshold: 300,
                pointRange: 0,
                states: {
                    hover: {
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1e3
            }
        },
        labels: {
            style: {
                position: "absolute",
                color: "#3E576F"
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function() {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {
                activeColor: "#274b6d",
                inactiveColor: "#CCC"
            },
            shadow: !1,
            itemStyle: {
                color: "#333333",
                fontSize: "12px",
                fontWeight: "bold"
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px",
                height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {
                style: {
                    fontWeight: "bold"
                }
            }
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative",
                top: "45%"
            },
            style: {
                position: "absolute",
                backgroundColor: "white",
                opacity: .5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: !0,
            animation: vt,
            backgroundColor: "rgba(53, 64, 82, 1)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            headerFormat: '<span style="font-size: 10px">{point.key}<\/span><br/>',
            pointFormat: '<span style="color:{series.color}">â—<\/span> {series.name}: <b>{point.y}<\/b><br/>',
            shadow: !0,
            snap: hf ? 25 : 10,
            style: {
                color: "#ffffff",
                cursor: "default",
                fontSize: "12px",
                padding: "15px 25px",
                whiteSpace: "nowrap",
                
            }
        },
        credits: {
            enabled: !0,
            href: "http://www.highcharts.com",
            position: {
                align: "right",
                x: -10,
                verticalAlign: "bottom",
                y: -5
            },
            style: {
                cursor: "pointer",
                color: "#909090",
                fontSize: "9px"
            }
        }
    };
    at = nt.plotOptions;
    rt = at.line;
    ef();
    var te = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        ie = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        re = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        yi = function(n) {
            var i = [],
                r, u;
            return function(n) {
                n && n.stops ? u = br(n.stops, function(n) {
                    return yi(n[1])
                }) : (r = te.exec(n)) ? i = [h(r[1]), h(r[2]), h(r[3]), parseFloat(r[4], 10)] : (r = ie.exec(n)) ? i = [h(r[1], 16), h(r[2], 16), h(r[3], 16), 1] : (r = re.exec(n)) && (i = [h(r[1]), h(r[2]), h(r[3]), 1])
            }(n), {
                get: function(r) {
                    var f;
                    return u ? (f = o(n), f.stops = [].concat(f.stops), t(u, function(n, t) {
                        f.stops[t] = [f.stops[t][0], n.get(r)]
                    })) : f = i && !isNaN(i[0]) ? r === "rgb" ? "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")" : r === "a" ? i[3] : "rgba(" + i.join(",") + ")" : n, f
                },
                brighten: function(n) {
                    if (u) t(u, function(t) {
                        t.brighten(n)
                    });
                    else if (ni(n) && n !== 0)
                        for (var r = 0; r < 3; r++) i[r] += h(n * 255), i[r] < 0 && (i[r] = 0), i[r] > 255 && (i[r] = 255);
                    return this
                },
                rgba: i,
                setOpacity: function(n) {
                    return i[3] = n, this
                }
            }
        };
    if (it.prototype = {
            opacity: 1,
            textProps: "fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow,HcTextStroke".split(","),
            init: function(n, t) {
                this.element = t === "span" ? ct(t) : s.createElementNS(ai, t);
                this.renderer = n
            },
            animate: function(t, i, r) {
                return i = n(i, vi, !0), iu(this), i ? (i = o(i, {}), r && (i.complete = r), lu(this, t, i)) : (this.attr(t), r && r()), this
            },
            colorGradient: function(n, r, u) {
                var l = this.renderer,
                    p, s, f, a, v, y, w, b, e, c, h = [];
                if (n.linearGradient ? s = "linearGradient" : n.radialGradient && (s = "radialGradient"), s) {
                    f = n[s];
                    a = l.gradients;
                    y = n.stops;
                    e = u.radialReference;
                    ir(f) && (n[s] = f = {
                        x1: f[0],
                        y1: f[1],
                        x2: f[2],
                        y2: f[3],
                        gradientUnits: "userSpaceOnUse"
                    });
                    s === "radialGradient" && e && !i(f.gradientUnits) && (f = o(f, {
                        cx: e[0] - e[2] / 2 + f.cx * e[2],
                        cy: e[1] - e[2] / 2 + f.cy * e[2],
                        r: f.r * e[2],
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (c in f) c !== "id" && h.push(c, f[c]);
                    for (c in y) h.push(y[c]);
                    h = h.join(",");
                    a[h] ? n = a[h].attr("id") : (f.id = n = "highcharts-" + wu++, a[h] = v = l.createElement(s).attr(f).add(l.defs), v.stops = [], t(y, function(n) {
                        n[1].indexOf("rgba") === 0 ? (p = yi(n[1]), w = p.get("rgb"), b = p.get("a")) : (w = n[1], b = 1);
                        n = l.createElement("stop").attr({
                            offset: n[0],
                            "stop-color": w,
                            "stop-opacity": b
                        }).add(v);
                        v.stops.push(n)
                    }));
                    u.setAttribute(r, "url(" + l.url + "#" + n + ")")
                }
            },
            attr: function(n, t) {
                var i, r, e = this.element,
                    o, s = this,
                    f;
                if (typeof n == "string" && t !== u && (i = n, n = {}, n[i] = t), typeof n == "string") s = (this[n + "Getter"] || this._defaultGetter).call(this, n, e);
                else {
                    for (i in n) r = n[i], f = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(i) && (o || (this.symbolAttr(n), o = !0), f = !0), this.rotation && (i === "x" || i === "y") && (this.doTransform = !0), f || (this[i + "Setter"] || this._defaultSetter).call(this, r, i, e), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(i) && this.updateShadows(i, r);
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                return s
            },
            updateShadows: function(n, t) {
                for (var i = this.shadows, u = i.length; u--;) i[u].setAttribute(n, n === "height" ? r(t - (i[u].cutHeight || 0), 0) : n === "d" ? this.d : t)
            },
            addClass: function(n) {
                var t = this.element,
                    i = g(t, "class") || "";
                return i.indexOf(n) === -1 && g(t, "class", i + " " + n), this
            },
            symbolAttr: function(i) {
                var r = this;
                t("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(t) {
                    r[t] = n(i[t], r[t])
                });
                r.attr({
                    d: r.renderer.symbols[r.symbolName](r.x, r.y, r.width, r.height, r)
                })
            },
            clip: function(n) {
                return this.attr("clip-path", n ? "url(" + this.renderer.url + "#" + n.id + ")" : ut)
            },
            crisp: function(n) {
                var t, r = {},
                    i, u = n.strokeWidth || this.strokeWidth || 0;
                i = e(u) % 2 / 2;
                n.x = ft(n.x || this.x || 0) + i;
                n.y = ft(n.y || this.y || 0) + i;
                n.width = ft((n.width || this.width || 0) - 2 * i);
                n.height = ft((n.height || this.height || 0) - 2 * i);
                n.strokeWidth = u;
                for (t in n) this[t] !== n[t] && (this[t] = r[t] = n[t]);
                return r
            },
            css: function(n) {
                var i = this.styles,
                    u = {},
                    e = this.element,
                    r, t, o = "";
                if (r = !i, n && n.color && (n.fill = n.color), i)
                    for (t in n) n[t] !== i[t] && (u[t] = n[t], r = !0);
                if (r) {
                    if (r = this.textWidth = n && n.width && e.nodeName.toLowerCase() === "text" && h(n.width), i && (n = f(i, u)), this.styles = n, r && (bt || !vt && this.renderer.forExport) && delete n.width, gi && !vt) a(this.element, n);
                    else {
                        i = function(n, t) {
                            return "-" + t.toLowerCase()
                        };
                        for (t in n) o += t.replace(/([A-Z])/g, i) + ":" + n[t] + ";";
                        g(e, "style", o)
                    }
                    r && this.added && this.renderer.buildText(this)
                }
                return this
            },
            on: function(n, t) {
                var r = this,
                    i = r.element;
                return gr && n === "click" ? (i.ontouchstart = function(n) {
                    r.touchEventFired = nr.now();
                    n.preventDefault();
                    t.call(i, n)
                }, i.onclick = function(n) {
                    (li.indexOf("Android") === -1 || nr.now() - (r.touchEventFired || 0) > 1100) && t.call(i, n)
                }) : i["on" + n] = t, this
            },
            setRadialReference: function(n) {
                return this.element.radialReference = n, this
            },
            translate: function(n, t) {
                return this.attr({
                    translateX: n,
                    translateY: t
                })
            },
            invert: function() {
                return this.inverted = !0, this.updateTransform(), this
            },
            updateTransform: function() {
                var t = this.translateX || 0,
                    u = this.translateY || 0,
                    f = this.scaleX,
                    e = this.scaleY,
                    o = this.inverted,
                    s = this.rotation,
                    r = this.element;
                o && (t += this.attr("width"), u += this.attr("height"));
                t = ["translate(" + t + "," + u + ")"];
                o ? t.push("rotate(90) scale(-1,1)") : s && t.push("rotate(" + s + " " + (r.getAttribute("x") || 0) + " " + (r.getAttribute("y") || 0) + ")");
                (i(f) || i(e)) && t.push("scale(" + n(f, 1) + " " + n(e, 1) + ")");
                t.length && r.setAttribute("transform", t.join(" "))
            },
            toFront: function() {
                var n = this.element;
                return n.parentNode.appendChild(n), this
            },
            align: function(t, i, r) {
                var f, u, o, h, s = {};
                return u = this.renderer, o = u.alignedObjects, t ? (this.alignOptions = t, this.alignByTranslate = i, !r || tr(r)) && (this.alignTo = f = r || "renderer", ii(o, this), o.push(this), r = null) : (t = this.alignOptions, i = this.alignByTranslate, f = this.alignTo), r = n(r, u[f], u), f = t.align, u = t.verticalAlign, o = (r.x || 0) + (t.x || 0), h = (r.y || 0) + (t.y || 0), (f === "right" || f === "center") && (o += (r.width - (t.width || 0)) / {
                    right: 1,
                    center: 2
                }[f]), s[i ? "translateX" : "x"] = e(o), (u === "bottom" || u === "middle") && (h += (r.height - (t.height || 0)) / ({
                    bottom: 1,
                    middle: 2
                }[u] || 1)), s[i ? "translateY" : "y"] = e(h), this[this.placed ? "animate" : "attr"](s), this.placed = !0, this.alignAttr = s, this
            },
            getBBox: function() {
                var n = this.bBox,
                    o = this.renderer,
                    t, i, s = this.rotation,
                    r, u, e;
                if (t = this.element, r = this.styles, u = s * di, i = this.textStr, (i === "" || bf.test(i)) && (e = "num." + i.toString().length + (r ? "|" + r.fontSize + "|" + r.fontFamily : "")), e && (n = o.cache[e]), !n) {
                    if (t.namespaceURI === ai || o.forExport) {
                        try {
                            n = t.getBBox ? f({}, t.getBBox()) : {
                                width: t.offsetWidth,
                                height: t.offsetHeight
                            }
                        } catch (h) {}(!n || n.width < 0) && (n = {
                            width: 0,
                            height: 0
                        })
                    } else n = this.htmlGetBBox();
                    o.isSVG && (t = n.width, i = n.height, gi && r && r.fontSize === "11px" && i.toPrecision(3) === "16.9" && (n.height = i = 14), s && (n.width = p(i * wt(u)) + p(t * lt(u)), n.height = p(i * lt(u)) + p(t * wt(u))));
                    this.bBox = n;
                    e && (o.cache[e] = n)
                }
                return n
            },
            show: function(n) {
                return n && this.element.namespaceURI === ai ? this.element.removeAttribute("visibility") : this.attr({
                    visibility: n ? "inherit" : "visible"
                }), this
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(n) {
                var t = this;
                t.animate({
                    opacity: 0
                }, {
                    duration: n || 150,
                    complete: function() {
                        t.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(n) {
                var t = this.renderer,
                    r = n || t,
                    e = r.element || t.box,
                    o = this.element,
                    u = this.zIndex,
                    f, s;
                if (n && (this.parentGroup = n), this.parentInverted = n && n.inverted, this.textStr !== void 0 && t.buildText(this), u && (r.handleZ = !0, u = h(u)), r.handleZ)
                    for (n = e.childNodes, f = 0; f < n.length; f++)
                        if (t = n[f], r = g(t, "zIndex"), t !== o && (h(r) > u || !i(u) && i(r))) {
                            e.insertBefore(o, t);
                            s = !0;
                            break
                        }
                return s || e.appendChild(o), this.added = !0, this.onAdd && this.onAdd(), this
            },
            safeRemoveChild: function(n) {
                var t = n.parentNode;
                t && t.removeChild(n)
            },
            destroy: function() {
                var n = this,
                    i = n.element || {},
                    f = n.shadows,
                    r = n.renderer.isSVG && i.nodeName === "SPAN" && n.parentGroup,
                    e, u;
                if (i.onclick = i.onmouseout = i.onmouseover = i.onmousemove = i.point = null, iu(n), n.clipPath && (n.clipPath = n.clipPath.destroy()), n.stops) {
                    for (u = 0; u < n.stops.length; u++) n.stops[u] = n.stops[u].destroy();
                    n.stops = null
                }
                for (n.safeRemoveChild(i), f && t(f, function(t) {
                        n.safeRemoveChild(t)
                    }); r && r.div && r.div.childNodes.length === 0;) i = r.parentGroup, n.safeRemoveChild(r.div), delete r.div, r = i;
                n.alignTo && ii(n.renderer.alignedObjects, n);
                for (e in n) delete n[e];
                return null
            },
            shadow: function(t, i, u) {
                var c = [],
                    e, f, h = this.element,
                    o, s, l, a;
                if (t) {
                    for (s = n(t.width, 3), l = (t.opacity || .15) / s, a = this.parentInverted ? "(-1,-1)" : "(" + n(t.offsetX, 1) + ", " + n(t.offsetY, 1) + ")", e = 1; e <= s; e++) f = h.cloneNode(0), o = s * 2 + 1 - 2 * e, g(f, {
                        isShadow: "true",
                        stroke: t.color || "black",
                        "stroke-opacity": l * e,
                        "stroke-width": o,
                        transform: "translate" + a,
                        fill: ut
                    }), u && (g(f, "height", r(g(f, "height") - o, 0)), f.cutHeight = o), i ? i.element.appendChild(f) : h.parentNode.insertBefore(f, h), c.push(f);
                    this.shadows = c
                }
                return this
            },
            xGetter: function(n) {
                return this.element.nodeName === "circle" && (n = {
                    x: "cx",
                    y: "cy"
                }[n] || n), this._defaultGetter(n)
            },
            _defaultGetter: function(t) {
                return t = n(this[t], this.element ? this.element.getAttribute(t) : null, 0), /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)), t
            },
            dSetter: function(n, t, i) {
                n && n.join && (n = n.join(" "));
                /(NaN| {2}|^$)/.test(n) && (n = "M 0 0");
                i.setAttribute(t, n);
                this[t] = n
            },
            dashstyleSetter: function(n) {
                var t;
                if (n = n && n.toLowerCase()) {
                    for (n = n.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), t = n.length; t--;) n[t] = h(n[t]) * this["stroke-width"];
                    n = n.join(",").replace("NaN", "none");
                    this.element.setAttribute("stroke-dasharray", n)
                }
            },
            alignSetter: function(n) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[n])
            },
            opacitySetter: function(n, t, i) {
                this[t] = n;
                i.setAttribute(t, n)
            },
            titleSetter: function(t) {
                var i = this.element.getElementsByTagName("title")[0];
                i || (i = s.createElementNS(ai, "title"), this.element.appendChild(i));
                i.textContent = n(t, "").replace(/<[^>]*>/g, "")
            },
            textSetter: function(n) {
                n !== this.textStr && (delete this.bBox, this.textStr = n, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(n, t, i) {
                typeof n == "string" ? i.setAttribute(t, n) : n && this.colorGradient(n, t, i)
            },
            zIndexSetter: function(n, t, i) {
                i.setAttribute(t, n);
                this[t] = n
            },
            _defaultSetter: function(n, t, i) {
                i.setAttribute(t, n)
            }
        }, it.prototype.yGetter = it.prototype.xGetter, it.prototype.translateXSetter = it.prototype.translateYSetter = it.prototype.rotationSetter = it.prototype.verticalAlignSetter = it.prototype.scaleXSetter = it.prototype.scaleYSetter = function(n, t) {
            this[t] = n;
            this.doTransform = !0
        }, it.prototype["stroke-widthSetter"] = it.prototype.strokeSetter = function(n, t, i) {
            this[t] = n;
            this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], it.prototype.fillSetter.call(this, this.stroke, "stroke", i), i.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : t === "stroke-width" && n === 0 && this.hasStroke && (i.removeAttribute("stroke"), this.hasStroke = !1)
        }, ei = function() {
            this.init.apply(this, arguments)
        }, ei.prototype = {
            Element: it,
            init: function(n, t, i, r, u) {
                var o = location,
                    e, r = this.createElement("svg").attr({
                        version: "1.1"
                    }).css(this.getStyle(r)),
                    f;
                e = r.element;
                n.appendChild(e);
                n.innerHTML.indexOf("xmlns") === -1 && g(e, "xmlns", ai);
                this.isSVG = !0;
                this.box = e;
                this.boxWrapper = r;
                this.alignedObjects = [];
                this.url = (pr || pu) && s.getElementsByTagName("base").length ? o.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(s.createTextNode("Created with Highcharts 4.0.4"));
                this.defs = this.createElement("defs").add();
                this.forExport = u;
                this.gradients = {};
                this.cache = {};
                this.setSize(t, i, !1);
                pr && n.getBoundingClientRect && (this.subPixelFix = t = function() {
                    a(n, {
                        left: 0,
                        top: 0
                    });
                    f = n.getBoundingClientRect();
                    a(n, {
                        left: fr(f.left) - f.left + "px",
                        top: fr(f.top) - f.top + "px"
                    })
                }, t(), b(k, "resize", t))
            },
            getStyle: function(n) {
                return this.style = f({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, n)
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var n = this.defs;
                return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), lr(this.gradients || {}), this.gradients = null, n && (this.defs = n.destroy()), this.subPixelFix && st(k, "resize", this.subPixelFix), this.alignedObjects = null
            },
            createElement: function(n) {
                var t = new this.Element;
                return t.init(this, n), t
            },
            draw: function() {},
            buildText: function(i) {
                for (var f = i.element, e = this, y = e.forExport, r = n(i.textStr, "").toString(), p = r.indexOf("<") !== -1, w = f.childNodes, c, l, v = g(f, "x"), u = i.styles, o = i.textWidth, b = u && u.lineHeight, nt = u && u.HcTextStroke, k = w.length, d = function(n) {
                        return b ? h(b) : e.fontMetrics(/(px|em)$/.test(n && n.style.fontSize) ? n.style.fontSize : u && u.fontSize || e.style.fontSize || 12, n).h
                    }; k--;) f.removeChild(w[k]);
                !p && !nt && r.indexOf(" ") === -1 ? f.appendChild(s.createTextNode(r)) : (c = /<.*style="([^"]+)".*>/, l = /<.*href="(http[^"]+)".*>/, o && !i.added && this.box.appendChild(f), r = p ? r.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "<\/span>").split(/<br.*?>/g) : [r], r[r.length - 1] === "" && r.pop(), t(r, function(n, r) {
                    var h, p = 0,
                        n = n.replace(/<span/g, "|||<span").replace(/<\/span>/g, "<\/span>|||");
                    h = n.split("|||");
                    t(h, function(n) {
                        var w, t, k;
                        if ((n !== "" || h.length === 1) && (w = {}, t = s.createElementNS(ai, "tspan"), c.test(n) && (k = n.match(c)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), g(t, "style", k)), l.test(n) && !y && (g(t, "onclick", 'location.href="' + n.match(l)[1] + '"'), a(t, {
                                cursor: "pointer"
                            })), n = (n.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), n !== " ")) {
                            if (t.appendChild(s.createTextNode(n)), p ? w.dx = 0 : r && v !== null && (w.x = v), g(t, w), f.appendChild(t), !p && r && (!vt && y && a(t, {
                                    display: "block"
                                }), g(t, "dy", d(t))), o)
                                for (var n = n.replace(/([^\^])-/g, "$1- ").split(" "), w = h.length > 1 || n.length > 1 && u.whiteSpace !== "nowrap", nt, b, it = u.HcHeight, tt = [], rt = d(t), ut = 1; w && (n.length || tt.length);) delete i.bBox, nt = i.getBBox(), b = nt.width, !vt && e.forExport && (b = e.measureSpanWidth(t.firstChild.data, i.styles)), nt = b > o, !nt || n.length === 1 ? (n = tt, tt = [], n.length && (ut++, it && ut * rt > it ? (n = ["..."], i.attr("title", i.textStr)) : (t = s.createElementNS(ai, "tspan"), g(t, {
                                    dy: rt,
                                    x: v
                                }), k && g(t, "style", k), f.appendChild(t))), b > o && (o = b)) : (t.removeChild(t.firstChild), tt.unshift(n.pop())), n.length && t.appendChild(s.createTextNode(n.join(" ").replace(/- /g, "-")));
                            p++
                        }
                    })
                }))
            },
            button: function(n, t, i, r, u, e, s, h, c) {
                var l = this.label(n, t, i, c, null, null, null, null, "button"),
                    a = 0,
                    w, k, v, y, p, d, n = {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    u = o({
                        "stroke-width": 1,
                        stroke: "#CCCCCC",
                        fill: {
                            linearGradient: n,
                            stops: [
                                [0, "#FEFEFE"],
                                [1, "#F6F6F6"]
                            ]
                        },
                        r: 2,
                        padding: 5,
                        style: {
                            color: "black"
                        }
                    }, u);
                return v = u.style, delete u.style, e = o(u, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: n,
                        stops: [
                            [0, "#FFF"],
                            [1, "#ACF"]
                        ]
                    }
                }, e), y = e.style, delete e.style, s = o(u, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: n,
                        stops: [
                            [0, "#9BD"],
                            [1, "#CDF"]
                        ]
                    }
                }, s), p = s.style, delete s.style, h = o(u, {
                    style: {
                        color: "#CCC"
                    }
                }, h), d = h.style, delete h.style, b(l.element, gi ? "mouseover" : "mouseenter", function() {
                    a !== 3 && l.attr(e).css(y)
                }), b(l.element, gi ? "mouseout" : "mouseleave", function() {
                    a !== 3 && (w = [u, e, s][a], k = [v, y, p][a], l.attr(w).css(k))
                }), l.setState = function(n) {
                    (l.state = a = n) ? n === 2 ? l.attr(s).css(p) : n === 3 && l.attr(h).css(d): l.attr(u).css(v)
                }, l.on("click", function() {
                    a !== 3 && r.call(l)
                }).attr(u).css(f({
                    cursor: "default"
                }, v))
            },
            crispLine: function(n, t) {
                return n[1] === n[4] && (n[1] = n[4] = e(n[1]) - t % 2 / 2), n[2] === n[5] && (n[2] = n[5] = e(n[2]) + t % 2 / 2), n
            },
            path: function(n) {
                var t = {
                    fill: ut
                };
                return ir(n) ? t.d = n : yt(n) && f(t, n), this.createElement("path").attr(t)
            },
            circle: function(n, t, i) {
                return n = yt(n) ? n : {
                    x: n,
                    y: t,
                    r: i
                }, t = this.createElement("circle"), t.xSetter = function(n) {
                    this.element.setAttribute("cx", n)
                }, t.ySetter = function(n) {
                    this.element.setAttribute("cy", n)
                }, t.attr(n)
            },
            arc: function(n, t, i, r, u, f) {
                return yt(n) && (t = n.y, i = n.r, r = n.innerR, u = n.start, f = n.end, n = n.x), n = this.symbol("arc", n || 0, t || 0, i || 0, i || 0, {
                    innerR: r || 0,
                    start: u || 0,
                    end: f || 0
                }), n.r = i, n
            },
            rect: function(n, t, i, f, e, o) {
                var e = yt(n) ? n.r : e,
                    s = this.createElement("rect"),
                    n = yt(n) ? n : n === u ? {} : {
                        x: n,
                        y: t,
                        width: r(i, 0),
                        height: r(f, 0)
                    };
                return o !== u && (n.strokeWidth = o, n = s.crisp(n)), e && (n.r = e), s.rSetter = function(n) {
                    g(this.element, {
                        rx: n,
                        ry: n
                    })
                }, s.attr(n)
            },
            setSize: function(t, i, r) {
                var u = this.alignedObjects,
                    f = u.length;
                for (this.width = t, this.height = i, this.boxWrapper[n(r, !0) ? "animate" : "attr"]({
                        width: t,
                        height: i
                    }); f--;) u[f].align()
            },
            g: function(n) {
                var t = this.createElement("g");
                return i(n) ? t.attr({
                    "class": "highcharts-" + n
                }) : t
            },
            image: function(n, t, i, r, u) {
                var e = {
                    preserveAspectRatio: ut
                };
                return arguments.length > 1 && f(e, {
                    x: t,
                    y: i,
                    width: r,
                    height: u
                }), e = this.createElement("image").attr(e), e.element.setAttributeNS ? e.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", n) : e.element.setAttribute("hc-svg-href", n), e
            },
            symbol: function(n, t, i, r, u, o) {
                var s, c = this.symbols[n],
                    c = c && c(e(t), e(i), r, u, o),
                    a = /^url\((.*?)\)$/,
                    h, l;
                return c ? (s = this.path(c), f(s, {
                    symbolName: n,
                    x: t,
                    y: i,
                    width: r,
                    height: u
                }), o && f(s, o)) : a.test(n) && (l = function(n, t) {
                    n.element && (n.attr({
                        width: t[0],
                        height: t[1]
                    }), n.alignByTranslate || n.translate(e((r - t[0]) / 2), e((u - t[1]) / 2)))
                }, h = n.match(a)[1], n = cf[h] || o && o.width && o.height && [o.width, o.height], s = this.image(h).attr({
                    x: t,
                    y: i
                }), s.isImg = !0, n ? l(s, n) : (s.attr({
                    width: 0,
                    height: 0
                }), ct("img", {
                    onload: function() {
                        l(s, cf[h] = [this.width, this.height])
                    },
                    src: h
                }))), s
            },
            symbols: {
                circle: function(n, t, i, r) {
                    var u = .166 * i;
                    return ["M", n + i / 2, t, "C", n + i + u, t, n + i + u, t + r, n + i / 2, t + r, "C", n - u, t + r, n - u, t, n + i / 2, t, "Z"]
                },
                square: function(n, t, i, r) {
                    return ["M", n, t, "L", n + i, t, n + i, t + r, n, t + r, "Z"]
                },
                triangle: function(n, t, i, r) {
                    return ["M", n + i / 2, t, "L", n + i, t + r, n, t + r, "Z"]
                },
                "triangle-down": function(n, t, i, r) {
                    return ["M", n, t, "L", n + i, t, n + i / 2, t + r, "Z"]
                },
                diamond: function(n, t, i, r) {
                    return ["M", n + i / 2, t, "L", n + i, t + r / 2, n + i / 2, t + r, n, t + r / 2, "Z"]
                },
                arc: function(n, t, i, r, u) {
                    var e = u.start,
                        i = u.r || i || r,
                        f = u.end - .001,
                        r = u.innerR,
                        o = u.open,
                        s = lt(e),
                        h = wt(e),
                        c = lt(f),
                        f = wt(f),
                        u = u.end - e < fi ? 0 : 1;
                    return ["M", n + i * s, t + i * h, "A", i, i, 0, u, 1, n + i * c, t + i * f, o ? "M" : "L", n + r * c, t + r * f, "A", r, r, 0, u, 0, n + r * s, t + r * h, o ? "" : "Z"]
                },
                callout: function(n, t, i, r, u) {
                    var f = l(u && u.r || 0, i, r),
                        h = f + 6,
                        o = u && u.anchorX,
                        s = u && u.anchorY,
                        u = e(u.strokeWidth || 0) % 2 / 2;
                    return n += u, t += u, u = ["M", n + f, t, "L", n + i - f, t, "C", n + i, t, n + i, t, n + i, t + f, "L", n + i, t + r - f, "C", n + i, t + r, n + i, t + r, n + i - f, t + r, "L", n + f, t + r, "C", n, t + r, n, t + r, n, t + r - f, "L", n, t + f, "C", n, t, n, t, n + f, t], o && o > i && s > t + h && s < t + r - h ? u.splice(13, 3, "L", n + i, s - 6, n + i + 6, s, n + i, s + 6, n + i, t + r - f) : o && o < 0 && s > t + h && s < t + r - h ? u.splice(33, 3, "L", n, s + 6, n - 6, s, n, s - 6, n, t + f) : s && s > r && o > n + h && o < n + i - h ? u.splice(23, 3, "L", o + 6, t + r, o, t + r + 6, o - 6, t + r, n + f, t + r) : s && s < 0 && o > n + h && o < n + i - h && u.splice(3, 3, "L", o - 6, t, o, t - 6, o + 6, t, i - f, t), u
                }
            },
            clipRect: function(n, t, i, r) {
                var u = "highcharts-" + wu++,
                    f = this.createElement("clipPath").attr({
                        id: u
                    }).add(this.defs),
                    n = this.rect(n, t, i, r, 0).add(f);
                return n.id = u, n.clipPath = f, n
            },
            text: function(n, t, i, r) {
                var f = bt || !vt && this.forExport,
                    u = {};
                return r && !this.forExport ? this.html(n, t, i) : (u.x = Math.round(t || 0), i && (u.y = Math.round(i)), (n || n === 0) && (u.text = n), n = this.createElement("text").attr(u), f && n.css({
                    position: "absolute"
                }), r || (n.xSetter = function(n, t, i) {
                    for (var f = i.getElementsByTagName("tspan"), u, e = i.getAttribute(t), r = 0; r < f.length; r++) u = f[r], u.getAttribute(t) === e && u.setAttribute(t, n);
                    i.setAttribute(t, n)
                }), n)
            },
            fontMetrics: function(n, t) {
                n = n || this.style.fontSize;
                t && k.getComputedStyle && (t = t.element || t, n = k.getComputedStyle(t, "").fontSize);
                var n = /px/.test(n) ? h(n) : /em/.test(n) ? parseFloat(n) * 12 : 12,
                    i = n < 24 ? n + 4 : e(n * 1.2),
                    r = e(i * .8);
                return {
                    h: i,
                    b: r,
                    f: n
                }
            },
            label: function(n, r, s, h, c, l, a, v, y) {
                function yt() {
                    var n, t;
                    n = w.element.style;
                    d = (nt === void 0 || ht === void 0 || p.styles.textAlign) && w.textStr && w.getBBox();
                    p.width = (nt || d.width || 0) + 2 * k + ot;
                    p.height = (ht || d.height || 0) + 2 * k;
                    at = k + g.fontMetrics(n && n.fontSize, w).b;
                    vt && (b || (n = e(-rt * k), t = v ? -at : 0, p.box = b = h ? g.symbol(h, n, t, p.width, p.height, ft) : g.rect(n, t, p.width, p.height, 0, ft[kf]), b.attr("fill", ut).add(p)), b.isImg || b.attr(f({
                        width: e(p.width),
                        height: e(p.height)
                    }, ft)), ft = null)
                }

                function et() {
                    var n = p.styles,
                        n = n && n.textAlign,
                        r = ot + k * (1 - rt),
                        t;
                    t = v ? 0 : at;
                    i(nt) && d && (n === "center" || n === "right") && (r += {
                        center: .5,
                        right: 1
                    }[n] * (nt - d.width));
                    (r !== w.x || t !== w.y) && (w.attr("x", r), t !== u && w.attr("y", t));
                    w.x = r;
                    w.y = t
                }

                function tt(n, t) {
                    b ? b.attr(n, t) : ft[n] = t
                }
                var g = this,
                    p = g.g(y),
                    w = g.text("", 0, 0, a).attr({
                        zIndex: 1
                    }),
                    b, d, rt = 0,
                    k = 3,
                    ot = 0,
                    nt, ht, ct, lt, pt = 0,
                    ft = {},
                    at, vt, wt;
                return p.onAdd = function() {
                    w.add(p);
                    p.attr({
                        text: n || n === 0 ? n : "",
                        x: r,
                        y: s
                    });
                    b && i(c) && p.attr({
                        anchorX: c,
                        anchorY: l
                    })
                }, p.widthSetter = function(n) {
                    nt = n
                }, p.heightSetter = function(n) {
                    ht = n
                }, p.paddingSetter = function(n) {
                    i(n) && n !== k && (k = n, et())
                }, p.paddingLeftSetter = function(n) {
                    i(n) && n !== ot && (ot = n, et())
                }, p.alignSetter = function(n) {
                    rt = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[n]
                }, p.textSetter = function(n) {
                    n !== u && w.textSetter(n);
                    yt();
                    et()
                }, p["stroke-widthSetter"] = function(n, t) {
                    n && (vt = !0);
                    pt = n % 2 / 2;
                    tt(t, n)
                }, p.strokeSetter = p.fillSetter = p.rSetter = function(n, t) {
                    t === "fill" && n && (vt = !0);
                    tt(t, n)
                }, p.anchorXSetter = function(n, t) {
                    c = n;
                    tt(t, n + pt - ct)
                }, p.anchorYSetter = function(n, t) {
                    l = n;
                    tt(t, n - lt)
                }, p.xSetter = function(n) {
                    p.x = n;
                    rt && (n -= rt * ((nt || d.width) + k));
                    ct = e(n);
                    p.attr("translateX", ct)
                }, p.ySetter = function(n) {
                    lt = p.y = e(n);
                    p.attr("translateY", lt)
                }, wt = p.css, f(p, {
                    css: function(n) {
                        if (n) {
                            var i = {},
                                n = o(n);
                            t(p.textProps, function(t) {
                                n[t] !== u && (i[t] = n[t], delete n[t])
                            });
                            w.css(i)
                        }
                        return wt.call(p, n)
                    },
                    getBBox: function() {
                        return {
                            width: d.width + 2 * k,
                            height: d.height + 2 * k,
                            x: d.x - k,
                            y: d.y - k
                        }
                    },
                    shadow: function(n) {
                        return b && b.shadow(n), p
                    },
                    destroy: function() {
                        st(p.element, "mouseenter");
                        st(p.element, "mouseleave");
                        w && (w = w.destroy());
                        b && (b = b.destroy());
                        it.prototype.destroy.call(p);
                        p = g = yt = et = tt = null
                    }
                })
            }
        }, dr = ei, f(it.prototype, {
            htmlCss: function(n) {
                var t = this.element;
                return (t = n && t.tagName === "SPAN" && n.width) && (delete n.width, this.textWidth = t, this.updateTransform()), this.styles = f(this.styles, n), a(this.element, n), this
            },
            htmlGetBBox: function() {
                var n = this.element,
                    t = this.bBox;
                return t || (n.nodeName === "text" && (n.style.position = "absolute"), t = this.bBox = {
                    x: n.offsetLeft,
                    y: n.offsetTop,
                    width: n.offsetWidth,
                    height: n.offsetHeight
                }), t
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var c = this.renderer,
                        r = this.element,
                        l = this.translateX || 0,
                        v = this.translateY || 0,
                        w = this.x || 0,
                        b = this.y || 0,
                        o = this.textAlign || "left",
                        y = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[o],
                        u = this.shadows;
                    if (a(r, {
                            marginLeft: l,
                            marginTop: v
                        }), u && t(u, function(n) {
                            a(n, {
                                marginLeft: l + 1,
                                marginTop: v + 1
                            })
                        }), this.inverted && t(r.childNodes, function(n) {
                            c.invertChild(n, r)
                        }), r.tagName === "SPAN") {
                        var f = this.rotation,
                            e, s = h(this.textWidth),
                            p = [f, o, r.innerHTML, this.textWidth].join(",");
                        p !== this.cTT && (e = c.fontMetrics(r.style.fontSize).b, i(f) && this.setSpanRotation(f, y, e), u = n(this.elemWidth, r.offsetWidth), u > s && /[ \-]/.test(r.textContent || r.innerText) && (a(r, {
                            width: s + "px",
                            display: "block",
                            whiteSpace: "normal"
                        }), u = s), this.getSpanCorrection(u, e, y, f, o));
                        a(r, {
                            left: w + (this.xCorr || 0) + "px",
                            top: b + (this.yCorr || 0) + "px"
                        });
                        pu && (e = r.offsetHeight);
                        this.cTT = p
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(n, t, i) {
                var r = {},
                    u = gi ? "-ms-transform" : pu ? "-webkit-transform" : pr ? "MozTransform" : sf ? "-o-transform" : "";
                r[u] = r.transform = "rotate(" + n + "deg)";
                r[u + (pr ? "Origin" : "-origin")] = r.transformOrigin = t * 100 + "% " + i + "px";
                a(this.element, r)
            },
            getSpanCorrection: function(n, t, i) {
                this.xCorr = -n * i;
                this.yCorr = -t
            }
        }), f(ei.prototype, {
            html: function(n, i, r) {
                var u = this.createElement("span"),
                    o = u.element,
                    s = u.renderer;
                return u.textSetter = function(n) {
                    n !== o.innerHTML && delete this.bBox;
                    o.innerHTML = this.textStr = n
                }, u.xSetter = u.ySetter = u.alignSetter = u.rotationSetter = function(n, t) {
                    t === "align" && (t = "textAlign");
                    u[t] = n;
                    u.htmlUpdateTransform()
                }, u.attr({
                    text: n,
                    x: e(i),
                    y: e(r)
                }).css({
                    position: "absolute",
                    whiteSpace: "nowrap",
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                }), u.css = u.htmlCss, s.isSVG && (u.add = function(n) {
                    var i, r = s.box.parentNode,
                        e = [];
                    if (this.parentGroup = n) {
                        if (i = n.div, !i) {
                            for (; n;) e.push(n), n = n.parentGroup;
                            t(e.reverse(), function(n) {
                                var t;
                                i = n.div = n.div || ct(er, {
                                    className: g(n.element, "class")
                                }, {
                                    position: "absolute",
                                    left: (n.translateX || 0) + "px",
                                    top: (n.translateY || 0) + "px"
                                }, i || r);
                                t = i.style;
                                f(n, {
                                    translateXSetter: function(i, r) {
                                        t.left = i + "px";
                                        n[r] = i;
                                        n.doTransform = !0
                                    },
                                    translateYSetter: function(i, r) {
                                        t.top = i + "px";
                                        n[r] = i;
                                        n.doTransform = !0
                                    },
                                    visibilitySetter: function(n, i) {
                                        t[i] = n
                                    }
                                })
                            })
                        }
                    } else i = r;
                    return i.appendChild(o), u.added = !0, u.alignOnAdd && u.htmlUpdateTransform(), u
                }), u
            }
        }), vt || bt || (ht = {
            init: function(n, t) {
                var i = ["<", t, ' filled="f" stroked="f"'],
                    r = ["position: ", "absolute", ";"],
                    u = t === er;
                (t === "shape" || u) && r.push("left:0;top:0;width:1px;height:1px;");
                r.push("visibility: ", u ? "hidden" : "visible");
                i.push(' style="', r.join(""), '"/>');
                t && (i = u || t === "span" || t === "img" ? i.join("") : n.prepVML(i), this.element = ct(i));
                this.renderer = n
            },
            add: function(n) {
                var i = this.renderer,
                    r = this.element,
                    t = i.box,
                    t = n ? n.element || n : t;
                return n && n.inverted && i.invertChild(r, t), t.appendChild(r), this.added = !0, this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), this
            },
            updateTransform: it.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var n = this.rotation,
                    t = lt(n * di),
                    i = wt(n * di);
                a(this.element, {
                    filter: n ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", t, ", M12=", -i, ", M21=", i, ", M22=", t, ", sizingMethod='auto expand')"].join("") : ut
                })
            },
            getSpanCorrection: function(t, i, r, u, f) {
                var e = u ? lt(u * di) : 1,
                    o = u ? wt(u * di) : 0,
                    h = n(this.elemHeight, this.element.offsetHeight),
                    s;
                this.xCorr = e < 0 && -t;
                this.yCorr = o < 0 && -h;
                s = e * o < 0;
                this.xCorr += o * i * (s ? 1 - r : r);
                this.yCorr -= e * i * (u ? s ? r : 1 - r : 1);
                f && f !== "left" && (this.xCorr -= t * r * (e < 0 ? -1 : 1), u && (this.yCorr -= h * r * (o < 0 ? -1 : 1)), a(this.element, {
                    textAlign: f
                }))
            },
            pathToVML: function(n) {
                for (var t = n.length, i = []; t--;) ni(n[t]) ? i[t] = e(n[t] * 10) - 5 : n[t] === "Z" ? i[t] = "x" : (i[t] = n[t], n.isArc && (n[t] === "wa" || n[t] === "at")) && (i[t + 5] === i[t + 7] && (i[t + 7] += n[t + 7] > n[t + 5] ? 1 : -1), i[t + 6] === i[t + 8] && (i[t + 8] += n[t + 8] > n[t + 6] ? 1 : -1));
                return i.join(" ") || "x"
            },
            clip: function(n) {
                var t = this,
                    i;
                return n ? (i = n.members, ii(i, t), i.push(t), t.destroyClip = function() {
                    ii(i, t)
                }, n = n.getCSS(t)) : (t.destroyClip && t.destroyClip(), n = {
                    clip: uu ? "inherit" : "rect(auto)"
                }), t.css(n)
            },
            css: it.prototype.htmlCss,
            safeRemoveChild: function(n) {
                n.parentNode && ar(n)
            },
            destroy: function() {
                return this.destroyClip && this.destroyClip(), it.prototype.destroy.apply(this)
            },
            on: function(n, t) {
                return this.element["on" + n] = function() {
                    var n = k.event;
                    n.target = n.srcElement;
                    t(n)
                }, this
            },
            cutOffPath: function(n, t) {
                var i, n = n.split(/[ ,]/);
                return i = n.length, (i === 9 || i === 11) && (n[i - 4] = n[i - 2] = h(n[i - 2]) - 10 * t), n.join(" ")
            },
            shadow: function(t, i, r) {
                var v = [],
                    f, e = this.element,
                    y = this.renderer,
                    u, p = e.style,
                    s, o = e.path,
                    c, l, a, w;
                if (o && typeof o.value != "string" && (o = "x"), l = o, t) {
                    for (a = n(t.width, 3), w = (t.opacity || .15) / a, f = 1; f <= 3; f++) c = a * 2 + 1 - 2 * f, r && (l = this.cutOffPath(o.value, c + .5)), s = ['<shape isShadow="true" strokeweight="', c, '" filled="false" path="', l, '" coordsize="10 10" style="', e.style.cssText, '" />'], u = ct(y.prepVML(s), null, {
                        left: h(p.left) + n(t.offsetX, 1),
                        top: h(p.top) + n(t.offsetY, 1)
                    }), r && (u.cutOff = c + 1), s = ['<stroke color="', t.color || "black", '" opacity="', w * f, '"/>'], ct(y.prepVML(s), null, null, u), i ? i.element.appendChild(u) : e.parentNode.insertBefore(u, e), v.push(u);
                    this.shadows = v
                }
                return this
            },
            updateShadows: hi,
            setAttr: function(n, t) {
                uu ? this.element[n] = t : this.element.setAttribute(n, t)
            },
            classSetter: function(n) {
                this.element.className = n
            },
            dashstyleSetter: function(n, t, i) {
                (i.getElementsByTagName("stroke")[0] || ct(this.renderer.prepVML(["<stroke/>"]), null, null, i))[t] = n || "solid";
                this[t] = n
            },
            dSetter: function(n, t, i) {
                var r = this.shadows,
                    n = n || [];
                if (this.d = n.join && n.join(" "), i.path = n = this.pathToVML(n), r)
                    for (i = r.length; i--;) r[i].path = r[i].cutOff ? this.cutOffPath(n, r[i].cutOff) : n;
                this.setAttr(t, n)
            },
            fillSetter: function(n, t, i) {
                var r = i.nodeName;
                r === "SPAN" ? i.style.color = n : r !== "IMG" && (i.filled = n !== ut, this.setAttr("fillcolor", this.renderer.color(n, i, t, this)))
            },
            opacitySetter: hi,
            rotationSetter: function(n, t, i) {
                i = i.style;
                this[t] = i[t] = n;
                i.left = -e(wt(n * di) + 1) + "px";
                i.top = e(lt(n * di)) + "px"
            },
            strokeSetter: function(n, t, i) {
                this.setAttr("strokecolor", this.renderer.color(n, i, t))
            },
            "stroke-widthSetter": function(n, t, i) {
                i.stroked = !!n;
                this[t] = n;
                ni(n) && (n += "px");
                this.setAttr("strokeweight", n)
            },
            titleSetter: function(n, t) {
                this.setAttr(t, n)
            },
            visibilitySetter: function(n, i, r) {
                n === "inherit" && (n = "visible");
                this.shadows && t(this.shadows, function(t) {
                    t.style[i] = n
                });
                r.nodeName === "DIV" && (n = n === "hidden" ? "-999em" : 0, uu || (r.style[i] = n ? "visible" : "hidden"), i = "top");
                r.style[i] = n
            },
            xSetter: function(n, t, i) {
                this[t] = n;
                t === "x" ? t = "left" : t === "y" && (t = "top");
                this.updateClipping ? (this[t] = n, this.updateClipping()) : i.style[t] = n
            },
            zIndexSetter: function(n, t, i) {
                i.style[t] = n
            }
        }, tt.VMLElement = ht = ri(it, ht), ht.prototype.ySetter = ht.prototype.widthSetter = ht.prototype.heightSetter = ht.prototype.xSetter, kt = {
            Element: ht,
            isIE8: li.indexOf("MSIE 8.0") > -1,
            init: function(n, t, i, r) {
                var u;
                if (this.alignedObjects = [], r = this.createElement(er).css(f(this.getStyle(r), {
                        position: "relative"
                    })), u = r.element, n.appendChild(r.element), this.isVML = !0, this.box = u, this.boxWrapper = r, this.cache = {}, this.setSize(t, i, !1), !s.namespaces.hcv) {
                    s.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        s.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (e) {
                        s.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(n, i, r, u) {
                var s = this.createElement(),
                    o = yt(n);
                return f(s, {
                    members: [],
                    left: (o ? n.x : n) + 1,
                    top: (o ? n.y : i) + 1,
                    width: (o ? n.width : r) - 1,
                    height: (o ? n.height : u) - 1,
                    getCSS: function(n) {
                        var t = n.element,
                            o = t.nodeName,
                            n = n.inverted,
                            i = this.top - (o === "shape" ? t.offsetTop : 0),
                            r = this.left,
                            t = r + this.width,
                            u = i + this.height,
                            i = {
                                clip: "rect(" + e(n ? r : i) + "px," + e(n ? u : t) + "px," + e(n ? t : u) + "px," + e(n ? i : r) + "px)"
                            };
                        return !n && uu && o === "DIV" && f(i, {
                            width: t + "px",
                            height: u + "px"
                        }), i
                    },
                    updateClipping: function() {
                        t(s.members, function(n) {
                            n.element && n.css(s.getCSS(n))
                        })
                    }
                })
            },
            color: function(n, i, r, u) {
                var lt = this,
                    s, b = /^rgba/,
                    v, c, f = ut;
                if (n && n.linearGradient ? c = "gradient" : n && n.radialGradient && (c = "pattern"), c) {
                    var h, y, e = n.linearGradient || n.radialGradient,
                        l, k, d, g, tt, p = "",
                        n = n.stops,
                        w, it = [],
                        rt = function() {
                            v = ['<fill colors="' + it.join(",") + '" opacity="', d, '" o:opacity2="', k, '" type="', c, '" ', p, 'focus="100%" method="any" />'];
                            ct(lt.prepVML(v), null, null, i)
                        };
                    if (l = n[0], w = n[n.length - 1], l[0] > 0 && n.unshift([0, l[1]]), w[0] < 1 && n.push([1, w[1]]), t(n, function(n, t) {
                            b.test(n[1]) ? (s = yi(n[1]), h = s.get("rgb"), y = s.get("a")) : (h = n[1], y = 1);
                            it.push(n[0] * 100 + "% " + h);
                            t ? (d = y, g = h) : (k = y, tt = h)
                        }), r === "fill")
                        if (c === "gradient") r = e.x1 || e[0] || 0, n = e.y1 || e[1] || 0, l = e.x2 || e[2] || 0, e = e.y2 || e[3] || 0, p = 'angle="' + (90 - et.atan((e - n) / (l - r)) * 180 / fi) + '"', rt();
                        else {
                            var f = e.r,
                                ft = f * 2,
                                ot = f * 2,
                                st = e.cx,
                                ht = e.cy,
                                a = i.radialReference,
                                o, f = function() {
                                    a && (o = u.getBBox(), st += (a[0] - o.x) / o.width - .5, ht += (a[1] - o.y) / o.height - .5, ft *= a[2] / o.width, ot *= a[2] / o.height);
                                    p = 'src="' + nt.global.VMLRadialGradientURL + '" size="' + ft + "," + ot + '" origin="0.5,0.5" position="' + st + "," + ht + '" color2="' + tt + '" ';
                                    rt()
                                };
                            u.added ? f() : u.onAdd = f;
                            f = g
                        }
                    else f = h
                } else b.test(n) && i.tagName !== "IMG" ? (s = yi(n), v = ["<", r, ' opacity="', s.get("a"), '"/>'], ct(this.prepVML(v), null, null, i), f = s.get("rgb")) : (f = i.getElementsByTagName(r), f.length && (f[0].opacity = 1, f[0].type = "solid"), f = n);
                return f
            },
            prepVML: function(n) {
                var t = this.isIE8,
                    n = n.join("");
                return t ? (n = n.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), n = n.indexOf('style="') === -1 ? n.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : n.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : n = n.replace("<", "<hcv:"), n
            },
            text: ei.prototype.html,
            path: function(n) {
                var t = {
                    coordsize: "10 10"
                };
                return ir(n) ? t.d = n : yt(n) && f(t, n), this.createElement("shape").attr(t)
            },
            circle: function(n, t, i) {
                var r = this.symbol("circle");
                return yt(n) && (i = n.r, t = n.y, n = n.x), r.isCircle = !0, r.r = i, r.attr({
                    x: n,
                    y: t
                })
            },
            g: function(n) {
                var t;
                return n && (t = {
                    className: "highcharts-" + n,
                    "class": "highcharts-" + n
                }), this.createElement(er).attr(t)
            },
            image: function(n, t, i, r, u) {
                var f = this.createElement("img").attr({
                    src: n
                });
                return arguments.length > 1 && f.attr({
                    x: t,
                    y: i,
                    width: r,
                    height: u
                }), f
            },
            createElement: function(n) {
                return n === "rect" ? this.symbol(n) : ei.prototype.createElement.call(this, n)
            },
            invertChild: function(n, i) {
                var f = this,
                    u = i.style,
                    r = n.tagName === "IMG" && n.style;
                a(n, {
                    flip: "x",
                    left: h(u.width) - (r ? h(r.top) : 1),
                    top: h(u.height) - (r ? h(r.left) : 1),
                    rotation: -90
                });
                t(n.childNodes, function(t) {
                    f.invertChild(t, n)
                })
            },
            symbols: {
                arc: function(n, t, i, r, u) {
                    var f = u.start,
                        o = u.end,
                        e = u.r || i || r,
                        i = u.innerR,
                        r = lt(f),
                        s = wt(f),
                        h = lt(o),
                        c = wt(o);
                    return o - f == 0 ? ["x"] : (f = ["wa", n - e, t - e, n + e, t + e, n + e * r, t + e * s, n + e * h, t + e * c], u.open && !i && f.push("e", "M", n, t), f.push("at", n - i, t - i, n + i, t + i, n + i * h, t + i * c, n + i * r, t + i * s, "x", "e"), f.isArc = !0, f)
                },
                circle: function(n, t, i, r, u) {
                    return u && (i = r = 2 * u.r), u && u.isCircle && (n -= i / 2, t -= r / 2), ["wa", n, t, n + i, t + r, n + i, t + r / 2, n + i, t + r / 2, "e"]
                },
                rect: function(n, t, r, u, f) {
                    return ei.prototype.symbols[!i(f) || !f.r ? "square" : "callout"].call(0, n, t, r, u, f)
                }
            }
        }, tt.VMLRenderer = ht = function() {
            this.init.apply(this, arguments)
        }, ht.prototype = o(ei.prototype, kt), dr = ht), ei.prototype.measureSpanWidth = function(n, t) {
            var i = s.createElement("span"),
                r;
            return r = s.createTextNode(n), i.appendChild(r), a(i, t), this.box.appendChild(i), r = i.offsetWidth, ar(i), r
        }, bt && (tt.CanVGRenderer = ht = function() {
            ai = "http://www.w3.org/1999/xhtml"
        }, ht.prototype.symbols = {}, pf = function() {
            function t() {
                for (var i = n.length, t = 0; t < i; t++) n[t]();
                n = []
            }
            var n = [];
            return {
                push: function(i, r) {
                    n.length === 0 && df(r, t);
                    n.push(i)
                }
            }
        }(), dr = ht), yr.prototype = {
            addLabel: function() {
                var t = this.axis,
                    h = t.options,
                    c = t.chart,
                    a = t.horiz,
                    s = t.categories,
                    p = t.names,
                    u = this.pos,
                    o = h.labels,
                    y = o.rotation,
                    l = t.tickPositions,
                    a = a && s && !o.step && !o.staggerLines && !o.rotation && c.plotWidth / l.length || !a && (c.margin[3] || c.chartWidth * .33),
                    b = u === l[0],
                    k = u === l[l.length - 1],
                    v, p = s ? n(s[u], p[u], u) : u,
                    s = this.label,
                    w = l.info;
                t.isDatetimeAxis && w && (v = h.dateTimeLabelFormats[w.higherRanks[u] || w.unitName]);
                this.isFirst = b;
                this.isLast = k;
                h = t.labelFormatter.call({
                    axis: t,
                    chart: c,
                    isFirst: b,
                    isLast: k,
                    dateTimeLabelFormat: v,
                    value: t.isLog ? pt(ti(p)) : p
                });
                u = a && {
                    width: r(1, e(a - 2 * (o.padding || 10))) + "px"
                };
                i(s) ? s && s.attr({
                    text: h
                }).css(u) : (v = {
                    align: t.labelAlign
                }, ni(y) && (v.rotation = y), a && o.ellipsis && (u.HcHeight = t.len / l.length), this.label = s = i(h) && o.enabled ? c.renderer.text(h, 0, 0, o.useHTML).attr(v).css(f(u, o.style)).add(t.labelGroup) : null, t.tickBaseline = c.renderer.fontMetrics(o.style.fontSize, s).b, y && t.side === 2 && (t.tickBaseline *= lt(y * di)));
                this.yOffset = s ? n(o.y, t.tickBaseline + (t.side === 2 ? 8 : -(s.getBBox().height / 2))) : 0
            },
            getLabelSize: function() {
                var n = this.label,
                    t = this.axis;
                return n ? n.getBBox()[t.horiz ? "height" : "width"] : 0
            },
            getLabelSides: function() {
                var n = this.label.getBBox(),
                    t = this.axis,
                    i = t.horiz,
                    r = t.options.labels,
                    n = i ? n.width : n.height,
                    t = i ? r.x - n * {
                        left: 0,
                        center: .5,
                        right: 1
                    }[t.labelAlign] : 0;
                return [t, i ? n + t : n]
            },
            handleOverflow: function(n, t) {
                var h = !0,
                    i = this.axis,
                    c = this.isFirst,
                    a = this.isLast,
                    f = i.horiz ? t.x : t.y,
                    v = i.reversed,
                    y = i.tickPositions,
                    s = this.getLabelSides(),
                    l = s[0],
                    s = s[1],
                    o, e, r, p = this.label.line;
                if (o = p || 0, e = i.labelEdge, r = i.justifyLabels && (c || a), e[o] === u || f + l > e[o] ? e[o] = f + s : r || (h = !1), r) {
                    o = (e = i.justifyToPlot) ? i.pos : 0;
                    e = e ? o + i.len : i.chart.chartWidth;
                    do n += c ? 1 : -1, r = i.ticks[y[n]]; while (y[n] && (!r || !r.label || r.label.line !== p));
                    i = r && r.label.xy && r.label.xy.x + r.getLabelSides()[c ? 0 : 1];
                    c && !v || a && v ? f + l < o && (f = o - l, r && f + s > i && (h = !1)) : f + s > e && (f = e - s, r && f + l < i && (h = !1));
                    t.x = f
                }
                return h
            },
            getPosition: function(n, t, i, r) {
                var u = this.axis,
                    f = u.chart,
                    e = r && f.oldChartHeight || f.chartHeight;
                return {
                    x: n ? u.translate(t + i, null, null, r) + u.transB : u.left + u.offset + (u.opposite ? (r && f.oldChartWidth || f.chartWidth) - u.right - u.left : 0),
                    y: n ? e - u.bottom + u.offset - (u.opposite ? u.height : 0) : e - u.translate(t + i, null, null, r) - u.transB
                }
            },
            getLabelPosition: function(n, t, i, r, u, f, e, o) {
                var s = this.axis,
                    c = s.transA,
                    l = s.reversed,
                    h = s.staggerLines,
                    n = n + u.x - (f && r ? f * c * (l ? -1 : 1) : 0),
                    t = t + this.yOffset - (f && !r ? f * c * (l ? 1 : -1) : 0);
                return h && (i.line = e / (o || 1) % h, t += i.line * (s.labelOffset / h)), {
                    x: n,
                    y: t
                }
            },
            getMarkPath: function(n, t, i, r, u, f) {
                return f.crispLine(["M", n, t, "L", n + (u ? 0 : -i), t + (u ? i : 0)], r)
            },
            render: function(t, i, r) {
                var f = this.axis,
                    e = f.options,
                    g = f.chart.renderer,
                    y = f.horiz,
                    h = this.type,
                    p = this.label,
                    c = this.pos,
                    w = e.labels,
                    s = this.gridLine,
                    l = h ? h + "Grid" : "grid",
                    a = h ? h + "Tick" : "tick",
                    b = e[l + "LineWidth"],
                    ut = e[l + "LineColor"],
                    it = e[l + "LineDashStyle"],
                    v = e[a + "Length"],
                    l = e[a + "Width"] || 0,
                    ft = e[a + "Color"],
                    et = e[a + "Position"],
                    a = this.mark,
                    nt = w.step,
                    k = !0,
                    tt = f.tickmarkOffset,
                    o = this.getPosition(y, c, tt, i),
                    d = o.x,
                    o = o.y,
                    rt = y && d === f.pos + f.len || !y && o === f.pos ? -1 : 1,
                    r = n(r, 1);
                this.isActive = !0;
                b && (c = f.getPlotLinePath(c + tt, b * rt, i, !0), s === u && (s = {
                    stroke: ut,
                    "stroke-width": b
                }, it && (s.dashstyle = it), h || (s.zIndex = 1), i && (s.opacity = 0), this.gridLine = s = b ? g.path(c).attr(s).add(f.gridGroup) : null), !i && s && c && s[this.isNew ? "attr" : "animate"]({
                    d: c,
                    opacity: r
                }));
                l && v && (et === "inside" && (v = -v), f.opposite && (v = -v), h = this.getMarkPath(d, o, v, l * rt, y, g), a ? a.animate({
                    d: h,
                    opacity: r
                }) : this.mark = g.path(h).attr({
                    stroke: ft,
                    "stroke-width": l,
                    opacity: r
                }).add(f.axisGroup));
                p && !isNaN(d) && (p.xy = o = this.getLabelPosition(d, o, p, y, w, tt, t, nt), this.isFirst && !this.isLast && !n(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !n(e.showLastLabel, 1) ? k = !1 : !f.isRadial && !w.step && !w.rotation && !i && r !== 0 && (k = this.handleOverflow(t, o)), nt && t % nt && (k = !1), k && !isNaN(o.y) ? (o.opacity = r, p[this.isNew ? "attr" : "animate"](o), this.isNew = !1) : p.attr("y", -9999))
            },
            destroy: function() {
                lr(this, this.axis)
            }
        }, tt.PlotLineOrBand = function(n, t) {
            this.axis = n;
            t && (this.options = t, this.id = t.id)
        }, tt.PlotLineOrBand.prototype = {
            render: function() {
                var h = this,
                    t = h.axis,
                    a = t.horiz,
                    w = (t.pointRange || 0) / 2,
                    u = h.options,
                    e = u.label,
                    c = h.label,
                    k = u.width,
                    y = u.to,
                    p = u.from,
                    f = i(p) && i(y),
                    d = u.value,
                    tt = u.dashStyle,
                    v = h.svgElem,
                    n = [],
                    it, g = u.color,
                    b = u.zIndex,
                    nt = u.events,
                    s = {},
                    rt = t.chart.renderer;
                if (t.isLog && (p = wi(p), y = wi(y), d = wi(d)), k)(n = t.getPlotLinePath(d, k), s = {
                    stroke: g,
                    "stroke-width": k
                }, tt) && (s.dashstyle = tt);
                else if (f) p = r(p, t.min - w), y = l(y, t.max + w), n = t.getPlotBandPath(p, y, u), g && (s.fill = g), u.borderWidth && (s.stroke = u.borderColor, s["stroke-width"] = u.borderWidth);
                else return;
                if (i(b) && (s.zIndex = b), v) n ? v.animate({
                    d: n
                }, null, v.onGetPath) : (v.hide(), v.onGetPath = function() {
                    v.show()
                }, c) && (h.label = c = c.destroy());
                else if (n && n.length && (h.svgElem = v = rt.path(n).attr(s).add(), nt))
                    for (it in w = function(n) {
                            v.on(n, function(t) {
                                nt[n].apply(h, [t])
                            })
                        }, nt) w(it);
                return e && i(e.text) && n && n.length && t.width > 0 && t.height > 0 ? (e = o({
                    align: a && f && "center",
                    x: a ? !f && 4 : 10,
                    verticalAlign: !a && f && "middle",
                    y: a ? f ? 16 : 10 : f ? 6 : -4,
                    rotation: a && !f && 90
                }, e), c || (s = {
                    align: e.textAlign || e.align,
                    rotation: e.rotation
                }, i(b) && (s.zIndex = b), h.label = c = rt.text(e.text, 0, 0, e.useHTML).attr(s).css(e.style).add()), t = [n[1], n[4], f ? n[6] : n[1]], f = [n[2], n[5], f ? n[7] : n[2]], n = cr(t), a = cr(f), c.align(e, !1, {
                    x: n,
                    y: a,
                    width: ki(t) - n,
                    height: ki(f) - a
                }), c.show()) : c && c.hide(), h
            },
            destroy: function() {
                ii(this.axis.plotLinesAndBands, this);
                delete this.axis;
                lr(this)
            }
        }, ui.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                gridLineColor: "#C0C0C0",
                labels: d,
                lineColor: "#C0D0E0",
                lineWidth: 1,
                minPadding: .01,
                maxPadding: .01,
                minorGridLineColor: "#E0E0E0",
                minorGridLineWidth: 1,
                minorTickColor: "#A0A0A0",
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickColor: "#C0D0E0",
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                tickWidth: 1,
                title: {
                    align: "middle",
                    style: {
                        color: "#707070"
                    }
                },
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8,
                    y: 3
                },
                lineWidth: 0,
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                tickWidth: 0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return bi(this.total, -1)
                    },
                    style: d.style
                }
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15,
                    y: null
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15,
                    y: null
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    x: 0,
                    y: null
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    x: 0,
                    y: -15
                },
                title: {
                    rotation: 0
                }
            },
            init: function(t, r) {
                var e = r.isX,
                    o, s, f;
                this.horiz = t.inverted ? !e : e;
                this.coll = (this.isXAxis = e) ? "xAxis" : "yAxis";
                this.opposite = r.opposite;
                this.side = r.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(r);
                f = this.options;
                o = f.type;
                this.labelFormatter = f.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = r;
                this.minPixelPadding = 0;
                this.chart = t;
                this.reversed = f.reversed;
                this.zoomEnabled = f.zoomEnabled !== !1;
                this.categories = f.categories || o === "category";
                this.names = [];
                this.isLog = o === "logarithmic";
                this.isDatetimeAxis = o === "datetime";
                this.isLinked = i(f.linkedTo);
                this.tickmarkOffset = this.categories && f.tickmarkPlacement === "between" && n(f.tickInterval, 1) === 1 ? .5 : 0;
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = f.minRange || f.maxZoom;
                this.range = f.range;
                this.offset = f.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.min = this.max = null;
                this.crosshair = n(f.crosshair, si(t.options.tooltip.crosshairs)[e ? 0 : 1], !1);
                f = this.options.events;
                or(this, t.axes) === -1 && (e && !this.isColorAxis ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this), t[this.coll].push(this));
                this.series = this.series || [];
                t.inverted && e && this.reversed === u && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (s in f) b(this, s, f[s]);
                this.isLog && (this.val2lin = wi, this.lin2val = ti)
            },
            setOptions: function(n) {
                this.options = o(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], o(nt[this.coll], n))
            },
            defaultLabelFormatter: function() {
                var i = this.axis,
                    t = this.value,
                    f = i.categories,
                    o = this.dateTimeLabelFormat,
                    e = nt.lang.numericSymbols,
                    r = e && e.length,
                    n, s = i.options.labels.format,
                    i = i.isLog ? t : i.tickInterval;
                if (s) n = ur(s, this);
                else if (f) n = t;
                else if (o) n = eu(o, t);
                else if (r && i >= 1e3)
                    for (; r-- && n === u;) f = Math.pow(1e3, r + 1), i >= f && e[r] !== null && (n = bi(t / f, -1) + e[r]);
                return n === u && (n = p(t) >= 1e4 ? bi(t, 0) : bi(t, -1, u, "")), n
            },
            getSeriesExtremes: function() {
                var u = this,
                    f = u.chart;
                u.hasVisibleSeries = !1;
                u.dataMin = u.dataMax = u.ignoreMinPadding = u.ignoreMaxPadding = null;
                u.buildStacks && u.buildStacks();
                t(u.series, function(t) {
                    var e, o;
                    (t.visible || !f.options.chart.ignoreHiddenSeries) && (e = t.options.threshold, u.hasVisibleSeries = !0, u.isLog && e <= 0 && (e = null), u.isXAxis ? (e = t.xData, e.length) && (u.dataMin = l(n(u.dataMin, e[0]), cr(e)), u.dataMax = r(n(u.dataMax, e[0]), ki(e))) : (t.getExtremes(), o = t.dataMax, t = t.dataMin, i(t) && i(o) && (u.dataMin = l(n(u.dataMin, t), t), u.dataMax = r(n(u.dataMax, o), o)), i(e) && (u.dataMin >= e ? (u.dataMin = e, u.ignoreMinPadding = !0) : u.dataMax < e && (u.dataMax = e, u.ignoreMaxPadding = !0))))
                })
            },
            translate: function(n, t, i, r, u, f) {
                var e = 1,
                    s = 0,
                    o = r ? this.oldTransA : this.transA,
                    r = r ? this.oldMin : this.min,
                    h = this.minPixelPadding,
                    u = (this.options.ordinal || this.isLog && u) && this.lin2val;
                return o || (o = this.transA), i && (e *= -1, s = this.len), this.reversed && (e *= -1, s -= e * (this.sector || this.len)), t ? (n = n * e + s, n -= h, n = n / o + r, u && (n = this.lin2val(n))) : (u && (n = this.val2lin(n)), f === "between" && (f = .5), n = e * (n - r) * o + s + e * h + (ni(f) ? o * f * this.pointRange : 0)), n
            },
            toPixels: function(n, t) {
                return this.translate(n, !1, !this.horiz, null, !0) + (t ? 0 : this.pos)
            },
            toValue: function(n, t) {
                return this.translate(n - (t ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(t, i, r, u, f) {
                var s = this.chart,
                    c = this.left,
                    l = this.top,
                    o, a, v = r && s.oldChartHeight || s.chartHeight,
                    y = r && s.oldChartWidth || s.chartWidth,
                    h;
                return o = this.transB, f = n(f, this.translate(t, null, null, r)), t = r = e(f + o), o = a = e(v - f - o), isNaN(f) ? h = !0 : this.horiz ? (o = l, a = v - this.bottom, t < c || t > c + this.width) && (h = !0) : (t = c, r = y - this.right, o < l || o > l + this.height) && (h = !0), h && !u ? null : s.renderer.crispLine(["M", t, o, "L", r, a], i || 1)
            },
            getLinearTickPositions: function(n, t, i) {
                var r, f = pt(ft(t / n) * n),
                    e = pt(fr(i / n) * n),
                    u = [];
                if (t === i && ni(t)) return [t];
                for (t = f; t <= e;) {
                    if (u.push(t), t = pt(t + n), t === r) break;
                    r = t
                }
                return u
            },
            getMinorTickPositions: function() {
                var i = this.options,
                    n = this.tickPositions,
                    r = this.minorTickInterval,
                    t = [],
                    u;
                if (this.isLog)
                    for (u = n.length, i = 1; i < u; i++) t = t.concat(this.getLogTickPositions(r, n[i - 1], n[i], !0));
                else if (this.isDatetimeAxis && i.minorTickInterval === "auto") t = t.concat(this.getTimeTicks(this.normalizeTimeTickInterval(r), this.min, this.max, i.startOfWeek)), t[0] < this.min && t.shift();
                else
                    for (n = this.min + (n[0] - this.min) % r; n <= this.max; n += r) t.push(n);
                return t
            },
            adjustForMinRange: function() {
                var s = this.options,
                    r = this.min,
                    f = this.max,
                    e, y = this.dataMax - this.dataMin >= this.minRange,
                    c, h, v, a, p, o;
                this.isXAxis && this.minRange === u && !this.isLog && (i(s.min) || i(s.max) ? this.minRange = null : (t(this.series, function(n) {
                    for (a = n.xData, h = p = n.xIncrement ? 1 : a.length - 1; h > 0; h--)(v = a[h] - a[h - 1], c === u || v < c) && (c = v)
                }), this.minRange = l(c * 5, this.dataMax - this.dataMin)));
                f - r < this.minRange && (o = this.minRange, e = (o - f + r) / 2, e = [r - e, n(s.min, r - e)], y && (e[2] = this.dataMin), r = ki(e), f = [r + o, n(s.max, r + o)], y && (f[2] = this.dataMax), f = cr(f), f - r < o && (e[0] = f - o, e[1] = n(s.min, f - o), r = ki(e)));
                this.min = r;
                this.max = f
            },
            setAxisTranslation: function(n) {
                var u = this,
                    c = u.max - u.min,
                    h = u.axisPointRange || 0,
                    f, o = 0,
                    s = 0,
                    e = u.linkedParent,
                    v = !!u.categories,
                    a = u.transA;
                (u.isXAxis || v || h) && (e ? (o = e.minPointOffset, s = e.pointRangePadding) : t(u.series, function(n) {
                    var t = v ? 1 : u.isXAxis ? n.pointRange : u.axisPointRange || 0,
                        a = n.options.pointPlacement,
                        e = n.closestPointRange;
                    t > c && (t = 0);
                    h = r(h, t);
                    o = r(o, tr(a) ? 0 : t / 2);
                    s = r(s, a === "on" ? 0 : t);
                    !n.noSharedTooltip && i(e) && (f = i(f) ? l(f, e) : e)
                }), e = u.ordinalSlope && f ? u.ordinalSlope / f : 1, u.minPointOffset = o *= e, u.pointRangePadding = s *= e, u.pointRange = l(h, c), u.closestPointRange = f);
                n && (u.oldTransA = a);
                u.translationSlope = u.transA = a = u.len / (c + s || 1);
                u.transB = u.horiz ? u.left : u.bottom;
                u.minPixelPadding = a * o
            },
            setTickPositions: function(u) {
                var f = this,
                    o = f.chart,
                    e = f.options,
                    h = e.startOnTick,
                    b = e.endOnTick,
                    s = f.isLog,
                    c = f.isDatetimeAxis,
                    it = f.isXAxis,
                    v = f.isLinked,
                    k = f.options.tickPositioner,
                    d = e.maxPadding,
                    g = e.minPadding,
                    a = e.tickInterval,
                    nt = e.minTickInterval,
                    y = e.tickPixelInterval,
                    tt, w = f.categories;
                v ? (f.linkedParent = o[f.coll][e.linkedTo], o = f.linkedParent.getExtremes(), f.min = n(o.min, o.dataMin), f.max = n(o.max, o.dataMax), e.type !== f.linkedParent.options.type && dt(11, 1)) : (f.min = n(f.userMin, e.min, f.dataMin), f.max = n(f.userMax, e.max, f.dataMax));
                s && (!u && l(f.min, n(f.dataMin, f.min)) <= 0 && dt(10, 1), f.min = pt(wi(f.min)), f.max = pt(wi(f.max)));
                f.range && i(f.max) && (f.userMin = f.min = r(f.min, f.max - f.range), f.userMax = f.max, f.range = null);
                f.beforePadding && f.beforePadding();
                f.adjustForMinRange();
                w || f.axisPointRange || f.usePercentage || v || !i(f.min) || !i(f.max) || !(o = f.max - f.min) || (!i(e.min) && !i(f.userMin) && g && (f.dataMin < 0 || !f.ignoreMinPadding) && (f.min -= o * g), !i(e.max) && !i(f.userMax) && d && (f.dataMax > 0 || !f.ignoreMaxPadding) && (f.max += o * d));
                ni(e.floor) && (f.min = r(f.min, e.floor));
                ni(e.ceiling) && (f.max = l(f.max, e.ceiling));
                f.min === f.max || f.min === void 0 || f.max === void 0 ? f.tickInterval = 1 : v && !a && y === f.linkedParent.options.tickPixelInterval ? f.tickInterval = f.linkedParent.tickInterval : (f.tickInterval = n(a, w ? 1 : (f.max - f.min) * y / r(f.len, y)), !i(a) && f.len < y && !this.isRadial && !this.isLog && !w && h && b && (tt = !0, f.tickInterval /= 4));
                it && !u && t(f.series, function(n) {
                    n.processData(f.min !== f.oldMin || f.max !== f.oldMax)
                });
                f.setAxisTranslation(!0);
                f.beforeSetTickPositions && f.beforeSetTickPositions();
                f.postProcessTickInterval && (f.tickInterval = f.postProcessTickInterval(f.tickInterval));
                f.pointRange && (f.tickInterval = r(f.pointRange, f.tickInterval));
                !a && f.tickInterval < nt && (f.tickInterval = nt);
                c || s || a || (f.tickInterval = vu(f.tickInterval, null, au(f.tickInterval), n(e.allowDecimals, !(f.tickInterval > 1 && f.tickInterval < 5 && f.max > 1e3 && f.max < 9999))));
                f.minorTickInterval = e.minorTickInterval === "auto" && f.tickInterval ? f.tickInterval / 5 : e.minorTickInterval;
                f.tickPositions = u = e.tickPositions ? [].concat(e.tickPositions) : k && k.apply(f, [f.min, f.max]);
                u || (!f.ordinalPositions && (f.max - f.min) / f.tickInterval > r(2 * f.len, 200) && dt(19, !0), u = c ? f.getTimeTicks(f.normalizeTimeTickInterval(f.tickInterval, e.units), f.min, f.max, e.startOfWeek, f.ordinalPositions, f.closestPointRange, !0) : s ? f.getLogTickPositions(f.tickInterval, f.min, f.max) : f.getLinearTickPositions(f.tickInterval, f.min, f.max), tt && u.splice(1, u.length - 2), f.tickPositions = u);
                v || (e = u[0], s = u[u.length - 1], c = f.minPointOffset || 0, h ? f.min = e : f.min - c > e && u.shift(), b ? f.max = s : f.max + c < s && u.pop(), u.length === 0 && i(e) && u.push((s + e) / 2), u.length === 1 && (h = p(f.max) > 1e13 ? 1 : .001, f.min -= h, f.max += h))
            },
            setMaxTicks: function() {
                var i = this.chart,
                    n = i.maxTicks || {},
                    t = this.tickPositions,
                    r = this._maxTicksKey = [this.coll, this.pos, this.len].join("-");
                !this.isLinked && !this.isDatetimeAxis && t && t.length > (n[r] || 0) && this.options.alignTicks !== !1 && (n[r] = t.length);
                i.maxTicks = n
            },
            adjustTickAmount: function() {
                var n = this._maxTicksKey,
                    t = this.tickPositions,
                    r = this.chart.maxTicks,
                    f, e;
                if (r && r[n] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== u) {
                    if (f = this.tickAmount, e = t.length, this.tickAmount = n = r[n], e < n) {
                        for (; t.length < n;) t.push(pt(t[t.length - 1] + this.tickInterval));
                        this.transA *= (e - 1) / (n - 1);
                        this.max = t[t.length - 1]
                    }
                    i(f) && n !== f && (this.isDirty = !0)
                }
            },
            setScale: function() {
                var n = this.stacks,
                    i, r, f, u;
                if (this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), u = this.len !== this.oldAxisLength, t(this.series, function(n) {
                        (n.isDirtyData || n.isDirty || n.xAxis.isDirty) && (f = !0)
                    }), u || f || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                    if (!this.isXAxis)
                        for (i in n)
                            for (r in n[i]) n[i][r].total = null, n[i][r].cum = 0;
                    this.forceRedraw = !1;
                    this.getSeriesExtremes();
                    this.setTickPositions();
                    this.oldUserMin = this.userMin;
                    this.oldUserMax = this.userMax;
                    this.isDirty || (this.isDirty = u || this.min !== this.oldMin || this.max !== this.oldMax)
                } else if (!this.isXAxis) {
                    this.oldStacks && (n = this.stacks = this.oldStacks);
                    for (i in n)
                        for (r in n[i]) n[i][r].cum = n[i][r].total
                }
                this.setMaxTicks()
            },
            setExtremes: function(t, i, r, u, e) {
                var o = this,
                    s = o.chart,
                    r = n(r, !0),
                    e = f(e, {
                        min: t,
                        max: i
                    });
                y(o, "setExtremes", e, function() {
                    o.userMin = t;
                    o.userMax = i;
                    o.eventArgs = e;
                    o.isDirtyExtremes = !0;
                    r && s.redraw(u)
                })
            },
            zoom: function(t, f) {
                var e = this.dataMin,
                    o = this.dataMax,
                    s = this.options;
                return this.allowZoomOutside || (i(e) && t <= l(e, n(s.min, e)) && (t = u), i(o) && f >= r(o, n(s.max, o)) && (f = u)), this.displayBtn = t !== u || f !== u, this.setExtremes(t, f, !1, u, {
                    trigger: "zoom"
                }), !0
            },
            setAxisSize: function() {
                var t = this.chart,
                    i = this.options,
                    e = i.offsetLeft || 0,
                    s = this.horiz,
                    o = n(i.width, t.plotWidth - e + (i.offsetRight || 0)),
                    u = n(i.height, t.plotHeight),
                    f = n(i.top, t.plotTop),
                    i = n(i.left, t.plotLeft + e),
                    e = /%$/;
                e.test(u) && (u = parseInt(u, 10) / 100 * t.plotHeight);
                e.test(f) && (f = parseInt(f, 10) / 100 * t.plotHeight + t.plotTop);
                this.left = i;
                this.top = f;
                this.width = o;
                this.height = u;
                this.bottom = t.chartHeight - u - f;
                this.right = t.chartWidth - o - i;
                this.len = r(s ? o : u, 0);
                this.pos = s ? i : f
            },
            getExtremes: function() {
                var n = this.isLog;
                return {
                    min: n ? pt(ti(this.min)) : this.min,
                    max: n ? pt(ti(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(n) {
                var t = this.isLog,
                    i = t ? ti(this.min) : this.min,
                    t = t ? ti(this.max) : this.max;
                return i > n || n === null ? n = i : t < n && (n = t), this.translate(n, 0, 1, 0, 1)
            },
            autoLabelAlign: function(t) {
                return t = (n(t, 0) - this.side * 90 + 720) % 360, t > 15 && t < 165 ? "right" : t > 195 && t < 345 ? "left" : "center"
            },
            getOffset: function() {
                var f = this,
                    v = f.chart,
                    y = v.renderer,
                    l = f.options,
                    k = f.tickPositions,
                    s = f.ticks,
                    p = f.horiz,
                    o = f.side,
                    st = v.inverted ? [1, 0, 3, 2][o] : o,
                    w, it, ht = 0,
                    rt, ct = 0,
                    e = l.title,
                    h = l.labels,
                    b = 0,
                    ut = v.axisOffset,
                    v = v.clipOffset,
                    et = [-1, 1, 1, -1][o],
                    c, d = 1,
                    lt = n(h.maxStaggerLines, 5),
                    nt, ot, a, g, tt;
                if (f.hasData = w = f.hasVisibleSeries || i(f.min) && i(f.max) && !!k, f.showAxis = it = w || n(l.showEmpty, !0), f.staggerLines = f.horiz && h.staggerLines, f.axisGroup || (f.gridGroup = y.g("grid").attr({
                        zIndex: l.gridZIndex || 1
                    }).add(), f.axisGroup = y.g("axis").attr({
                        zIndex: l.zIndex || 2
                    }).add(), f.labelGroup = y.g("axis-labels").attr({
                        zIndex: h.zIndex || 7
                    }).addClass("highcharts-" + f.coll.toLowerCase() + "-labels").add()), w || f.isLinked) {
                    if (f.labelAlign = n(h.align || f.autoLabelAlign(h.rotation)), t(k, function(n) {
                            s[n] ? s[n].addLabel() : s[n] = new yr(f, n)
                        }), f.horiz && !f.staggerLines && lt && !h.rotation) {
                        for (w = f.reversed ? [].concat(k).reverse() : k; d < lt;) {
                            for (nt = [], ot = !1, c = 0; c < w.length; c++) a = w[c], g = (g = s[a].label && s[a].label.getBBox()) ? g.width : 0, tt = c % d, g && (a = f.translate(a), nt[tt] !== u && a < nt[tt] && (ot = !0), nt[tt] = a + g);
                            if (ot) d++;
                            else break
                        }
                        d > 1 && (f.staggerLines = d)
                    }
                    t(k, function(n) {
                        (o === 0 || o === 2 || {
                            1: "left",
                            3: "right"
                        }[o] === f.labelAlign) && (b = r(s[n].getLabelSize(), b))
                    });
                    f.staggerLines && (b *= f.staggerLines, f.labelOffset = b)
                } else
                    for (c in s) s[c].destroy(), delete s[c];
                e && e.text && e.enabled !== !1 && (f.axisTitle || (f.axisTitle = y.text(e.text, 0, 0, e.useHTML).attr({
                    zIndex: 7,
                    rotation: e.rotation || 0,
                    align: e.textAlign || {
                        low: "left",
                        middle: "center",
                        high: "right"
                    }[e.align]
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(e.style).add(f.axisGroup), f.axisTitle.isNew = !0), it && (ht = f.axisTitle.getBBox()[p ? "height" : "width"], rt = e.offset, ct = i(rt) ? 0 : n(e.margin, p ? 5 : 10)), f.axisTitle[it ? "show" : "hide"]());
                f.offset = et * n(l.offset, ut[o]);
                y = o === 2 ? f.tickBaseline : 0;
                p = b + ct + (b && et * (p ? n(h.y, f.tickBaseline + 8) : h.x) - y);
                f.axisTitleMargin = n(rt, p);
                ut[o] = r(ut[o], f.axisTitleMargin + ht + et * f.offset, p);
                v[st] = r(v[st], ft(l.lineWidth / 2) * 2)
            },
            getLinePath: function(n) {
                var t = this.chart,
                    u = this.opposite,
                    i = this.offset,
                    r = this.horiz,
                    f = this.left + (u ? this.width : 0) + i,
                    i = t.chartHeight - this.bottom - (u ? this.height : 0) + i;
                return u && (n *= -1), t.renderer.crispLine(["M", r ? this.left : f, r ? i : this.top, "L", r ? t.chartWidth - this.right : f, r ? i : t.chartHeight - this.bottom], n)
            },
            getTitlePosition: function() {
                var n = this.horiz,
                    i = this.left,
                    e = this.top,
                    t = this.len,
                    r = this.options.title,
                    u = n ? i : e,
                    f = this.opposite,
                    o = this.offset,
                    s = h(r.style.fontSize || 12),
                    t = {
                        low: u + (n ? 0 : t),
                        middle: u + t / 2,
                        high: u + (n ? t : 0)
                    }[r.align],
                    i = (n ? e + this.height : i) + (n ? 1 : -1) * (f ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? s : 0);
                return {
                    x: n ? t : i + (f ? this.width : 0) + o + (r.x || 0),
                    y: n ? i - (f ? this.height : 0) + o : t + (r.y || 0)
                }
            },
            render: function() {
                var n = this,
                    h = n.horiz,
                    b = n.reversed,
                    a = n.chart,
                    et = a.renderer,
                    e = n.options,
                    k = n.isLog,
                    d = n.isLinked,
                    c = n.tickPositions,
                    o, l = n.axisTitle,
                    r = n.ticks,
                    s = n.minorTicks,
                    f = n.alternateBands,
                    g = e.stackLabels,
                    nt = e.alternateGridColor,
                    v = n.tickmarkOffset,
                    y = e.lineWidth,
                    it = a.hasRendered && i(n.oldMin) && !isNaN(n.oldMin),
                    ot = n.hasData,
                    rt = n.showAxis,
                    p, ut = e.labels.overflow,
                    ft = n.justifyLabels = h && ut !== !1,
                    w;
                n.labelEdge.length = 0;
                n.justifyToPlot = ut === "justify";
                t([r, s, f], function(n) {
                    for (var t in n) n[t].isActive = !1
                });
                (ot || d) && ((n.minorTickInterval && !n.categories && t(n.getMinorTickPositions(), function(t) {
                    s[t] || (s[t] = new yr(n, t, "minor"));
                    it && s[t].isNew && s[t].render(null, !0);
                    s[t].render(null, !1, 1)
                }), c.length && (o = c.slice(), (h && b || !h && !b) && o.reverse(), ft && (o = o.slice(1).concat([o[0]])), t(o, function(t, i) {
                    ft && (i = i === o.length - 1 ? 0 : i + 1);
                    (!d || t >= n.min && t <= n.max) && (r[t] || (r[t] = new yr(n, t)), it && r[t].isNew && r[t].render(i, !0, .1), r[t].render(i))
                }), v && n.min === 0 && (r[-1] || (r[-1] = new yr(n, -1, null, !0)), r[-1].render(-1))), nt && t(c, function(t, i) {
                    i % 2 == 0 && t < n.max && (f[t] || (f[t] = new tt.PlotLineOrBand(n)), p = t + v, w = c[i + 1] !== u ? c[i + 1] + v : n.max, f[t].options = {
                        from: k ? ti(p) : p,
                        to: k ? ti(w) : w,
                        color: nt
                    }, f[t].render(), f[t].isActive = !0)
                }), n._addedPlotLB) || (t((e.plotLines || []).concat(e.plotBands || []), function(t) {
                    n.addPlotBandOrLine(t)
                }), n._addedPlotLB = !0));
                t([r, s, f], function(n) {
                    var t, i, r = [],
                        u = vi ? vi.duration || 500 : 0,
                        e = function() {
                            for (i = r.length; i--;) n[r[i]] && !n[r[i]].isActive && (n[r[i]].destroy(), delete n[r[i]])
                        };
                    for (t in n) n[t].isActive || (n[t].render(t, !1, 0), n[t].isActive = !1, r.push(t));
                    n === f || !a.hasRendered || !u ? e() : u && setTimeout(e, u)
                });
                y && (h = n.getLinePath(y), n.axisLine ? n.axisLine.animate({
                    d: h
                }) : n.axisLine = et.path(h).attr({
                    stroke: e.lineColor,
                    "stroke-width": y,
                    zIndex: 7
                }).add(n.axisGroup), n.axisLine[rt ? "show" : "hide"]());
                l && rt && (l[l.isNew ? "attr" : "animate"](n.getTitlePosition()), l.isNew = !1);
                g && g.enabled && n.renderStackTotals();
                n.isDirty = !1
            },
            redraw: function() {
                this.render();
                t(this.plotLinesAndBands, function(n) {
                    n.render()
                });
                t(this.series, function(n) {
                    n.isDirty = !0
                })
            },
            destroy: function(n) {
                var i = this,
                    r = i.stacks,
                    u, f = i.plotLinesAndBands;
                n || st(i);
                for (u in r) lr(r[u]), r[u] = null;
                for (t([i.ticks, i.minorTicks, i.alternateBands], function(n) {
                        lr(n)
                    }), n = f.length; n--;) f[n].destroy();
                t("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(n) {
                    i[n] && (i[n] = i[n].destroy())
                });
                this.cross && this.cross.destroy()
            },
            drawCrosshair: function(t, r) {
                if (this.crosshair)
                    if ((i(r) || !n(this.crosshair.snap, !0)) === !1) this.hideCrosshair();
                    else {
                        var u, f = this.crosshair,
                            e = f.animation;
                        n(f.snap, !0) ? i(r) && (u = this.chart.inverted != this.horiz ? r.plotX : this.len - r.plotY) : u = this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos;
                        u = this.isRadial ? this.getPlotLinePath(this.isXAxis ? r.x : n(r.stackY, r.y)) : this.getPlotLinePath(null, null, null, null, u);
                        u === null ? this.hideCrosshair() : this.cross ? this.cross.attr({
                            visibility: "visible"
                        })[e ? "animate" : "attr"]({
                            d: u
                        }, e) : (e = {
                            "stroke-width": f.width || 1,
                            stroke: f.color || "#C0C0C0",
                            zIndex: f.zIndex || 2
                        }, f.dashStyle && (e.dashstyle = f.dashStyle), this.cross = this.chart.renderer.path(u).attr(e).add())
                    }
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        }, f(ui.prototype, {
            getPlotBandPath: function(n, t) {
                var i = this.getPlotLinePath(t),
                    r = this.getPlotLinePath(n);
                return r && i ? r.push(i[4], i[5], i[1], i[2]) : r = null, r
            },
            addPlotBand: function(n) {
                return this.addPlotBandOrLine(n, "plotBands")
            },
            addPlotLine: function(n) {
                return this.addPlotBandOrLine(n, "plotLines")
            },
            addPlotBandOrLine: function(n, t) {
                var i = new tt.PlotLineOrBand(this, n).render(),
                    r = this.userOptions;
                return i && (t && (r[t] = r[t] || [], r[t].push(n)), this.plotLinesAndBands.push(i)), i
            },
            removePlotBandOrLine: function(n) {
                for (var r = this.plotLinesAndBands, u = this.options, f = this.userOptions, i = r.length; i--;) r[i].id === n && r[i].destroy();
                t([u.plotLines || [], f.plotLines || [], u.plotBands || [], f.plotBands || []], function(t) {
                    for (i = t.length; i--;) t[i].id === n && ii(t, t[i])
                })
            }
        }), ui.prototype.getTimeTicks = function(r, u, e, o) {
            var v = [],
                y = {},
                p = nt.global.useUTC,
                a, s = new nr(u - wr),
                h = r.unitRange,
                l = r.count;
            if (i(u)) {
                h >= c.second && (s.setMilliseconds(0), s.setSeconds(h >= c.minute ? 0 : l * ft(s.getSeconds() / l)));
                h >= c.minute && s[lf](h >= c.hour ? 0 : l * ft(s[ku]() / l));
                h >= c.hour && s[af](h >= c.day ? 0 : l * ft(s[du]() / l));
                h >= c.day && s[nf](h >= c.month ? 1 : l * ft(s[tu]() / l));
                h >= c.month && (s[vf](h >= c.year ? 0 : l * ft(s[su]() / l)), a = s[hu]());
                h >= c.year && (a -= a % l, s[yf](a));
                h === c.week && s[nf](s[tu]() - s[gu]() + n(o, 1));
                u = 1;
                wr && (s = new nr(s.getTime() + wr));
                a = s[hu]();
                for (var o = s.getTime(), w = s[su](), b = s[tu](), k = (c.day + (p ? wr : s.getTimezoneOffset() * 6e4)) % c.day; o < e;) v.push(o), h === c.year ? o = ou(a + u * l, 0) : h === c.month ? o = ou(a, w + u * l) : !p && (h === c.day || h === c.week) ? o = ou(a, w, b + u * l * (h === c.day ? 1 : 7)) : o += h * l, u++;
                v.push(o);
                t(tf(v, function(n) {
                    return h <= c.hour && n % c.day === k
                }), function(n) {
                    y[n] = "day"
                })
            }
            return v.info = f(r, {
                higherRanks: y,
                totalRange: h * l
            }), v
        }, ui.prototype.normalizeTimeTickInterval = function(n, t) {
            for (var i = t || [
                    ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ["second", [1, 2, 5, 10, 15, 30]],
                    ["minute", [1, 2, 5, 10, 15, 30]],
                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                    ["day", [1, 2]],
                    ["week", [1, 2]],
                    ["month", [1, 2, 3, 4, 6]],
                    ["year", null]
                ], u = i[i.length - 1], f = c[u[0]], o = u[1], e = 0; e < i.length; e++)
                if (u = i[e], f = c[u[0]], o = u[1], i[e + 1] && n <= (f * o[o.length - 1] + c[i[e + 1][0]]) / 2) break;
            return f === c.year && n < 5 * f && (o = [1, 2, 5]), i = vu(n / f, o, u[0] === "year" ? r(au(n / f), 1) : 1), {
                unitRange: f,
                count: i,
                unitName: u[0]
            }
        }, ui.prototype.getLogTickPositions = function(t, i, r, f) {
            var s = this.options,
                o = this.len,
                c = [],
                l, y, a, h, v;
            if (f || (this._minorAutoInterval = null), t >= .5) t = e(t), c = this.getLinearTickPositions(t, i, r);
            else if (t >= .08)
                for (o = ft(i), s = t > .3 ? [1, 2, 4] : t > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; o < r + 1 && !v; o++)
                    for (y = s.length, l = 0; l < y && !v; l++) a = wi(ti(o) * s[l]), a > i && (!f || h <= r) && h !== u && c.push(h), h > r && (v = !0), h = a;
            else(i = ti(i), r = ti(r), t = s[f ? "minorTickInterval" : "tickInterval"], t = n(t === "auto" ? null : t, this._minorAutoInterval, (r - i) * (s.tickPixelInterval / (f ? 5 : 1)) / ((f ? o / this.tickPositions.length : o) || 1)), t = vu(t, null, au(t)), c = br(this.getLinearTickPositions(t, i, r), wi), f) || (this._minorAutoInterval = t / 5);
            return f || (this.tickInterval = t), c
        }, rf = tt.Tooltip = function() {
            this.init.apply(this, arguments)
        }, rf.prototype = {
            init: function(n, t) {
                var r = t.borderWidth,
                    i = t.style,
                    u = h(i.padding);
                this.chart = n;
                this.options = t;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.label = n.renderer.label("", 0, 0, t.shape || "callout", null, null, t.useHTML, null, "tooltip").attr({
                    padding: u,
                    fill: t.backgroundColor,
                    "stroke-width": r,
                    r: t.borderRadius,
                    zIndex: 8
                }).css(i).css({
                    padding: 0
                }).add().attr({
                    y: -9999
                });
                bt || this.label.shadow(t.shadow);
                this.shared = t.shared
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function(n, t, i, r) {
                var e = this,
                    o = e.now,
                    s = e.options.animation !== !1 && !e.isHidden && (p(n - o.x) > 1 || p(t - o.y) > 1),
                    h = e.followPointer || e.len > 1;
                f(o, {
                    x: s ? (2 * o.x + n) / 3 : n,
                    y: s ? (o.y + t) / 2 : t,
                    anchorX: h ? u : s ? (2 * o.anchorX + i) / 3 : i,
                    anchorY: h ? u : s ? (o.anchorY + r) / 2 : r
                });
                e.label.attr(o);
                s && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    e && e.move(n, t, i, r)
                }, 32))
            },
            hide: function(i) {
                var u = this,
                    r;
                clearTimeout(this.hideTimer);
                this.isHidden || (r = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
                    u.label.fadeOut();
                    u.isHidden = !0
                }, n(i, this.options.hideDelay, 500)), r && t(r, function(n) {
                    n.setState()
                }), this.chart.hoverPoints = null)
            },
            getAnchor: function(n, i) {
                var f, r = this.chart,
                    o = r.inverted,
                    c = r.plotTop,
                    s = 0,
                    h = 0,
                    l, n = si(n);
                return f = n[0].tooltipPos, this.followPointer && i && (i.chartX === u && (i = r.pointer.normalize(i)), f = [i.chartX - r.plotLeft, i.chartY - c]), f || (t(n, function(n) {
                    l = n.series.yAxis;
                    s += n.plotX;
                    h += (n.plotLow ? (n.plotLow + n.plotHigh) / 2 : n.plotY) + (!o && l ? l.top - c : 0)
                }), s /= n.length, h /= n.length, f = [o ? r.plotWidth - h : s, this.shared && !o && n.length > 1 && i ? i.chartY - c : o ? r.plotHeight - s : h]), br(f, e)
            },
            getPosition: function(n, t, i) {
                var u = this.chart,
                    f = this.distance,
                    r = {},
                    e, o = ["y", u.chartHeight, t, i.plotY + u.plotTop],
                    s = ["x", u.chartWidth, n, i.plotX + u.plotLeft],
                    l = i.ttBelow || u.inverted && !i.negative || !u.inverted && i.negative,
                    a = function(n, t, i, u) {
                        var e = i < u - f,
                            t = u + f + i < t,
                            i = u - f - i;
                        if (u += f, l && t) r[n] = u;
                        else if (!l && e) r[n] = i;
                        else if (e) r[n] = i;
                        else if (t) r[n] = u;
                        else return !1
                    },
                    v = function(n, t, i, u) {
                        if (u < f || u > t - f) return !1;
                        r[n] = u < i / 2 ? 1 : u > t - i / 2 ? t - i - 2 : u - i / 2
                    },
                    h = function(n) {
                        var t = o;
                        o = s;
                        s = t;
                        e = n
                    },
                    c = function() {
                        a.apply(0, o) !== !1 ? v.apply(0, s) === !1 && !e && (h(!0), c()) : e ? r.x = r.y = 0 : (h(!0), c())
                    };
                return (u.inverted || this.len > 1) && h(), c(), r
            },
            defaultFormatter: function(n) {
                var u = this.points || si(this),
                    i = u[0].series,
                    r;
                return r = [n.tooltipHeaderFormatter(u[0])], t(u, function(n) {
                    i = n.series;
                    r.push(i.tooltipFormatter && i.tooltipFormatter(n) || n.point.tooltipFormatter(i.tooltipOptions.pointFormat))
                }), r.push(n.options.footerFormat || ""), r.join("")
            },
            refresh: function(i, r) {
                var o = this.chart,
                    s = this.label,
                    a = this.options,
                    h, f, u = {},
                    e, c = [],
                    l, v;
                e = a.formatter || this.defaultFormatter;
                u = o.hoverPoints;
                v = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = si(i)[0].series.tooltipOptions.followPointer;
                f = this.getAnchor(i, r);
                h = f[0];
                f = f[1];
                v && (!i.series || !i.series.noSharedTooltip) ? (o.hoverPoints = i, u && t(u, function(n) {
                    n.setState()
                }), t(i, function(n) {
                    n.setState("hover");
                    c.push(n.getLabelConfig())
                }), u = {
                    x: i[0].category,
                    y: i[0].y
                }, u.points = c, this.len = c.length, i = i[0]) : u = i.getLabelConfig();
                e = e.call(u, this);
                u = i.series;
                this.distance = n(u.tooltipOptions.distance, 16);
                e === !1 ? this.hide() : (this.isHidden && (iu(s), s.attr("opacity", 1).show()), s.attr({
                    text: e
                }), l = a.borderColor || i.color || u.color || "#606060", s.attr({
                    stroke: l
                }), this.updatePosition({
                    plotX: h,
                    plotY: f,
                    negative: i.negative,
                    ttBelow: i.ttBelow
                }), this.isHidden = !1);
                y(o, "tooltipRefresh", {
                    text: e,
                    x: h + o.plotLeft,
                    y: f + o.plotTop,
                    borderColor: l
                })
            },
            updatePosition: function(n) {
                var i = this.chart,
                    t = this.label,
                    t = (this.options.positioner || this.getPosition).call(this, t.width, t.height, n);
                this.move(e(t.x), e(t.y), n.plotX + i.plotLeft, n.plotY + i.plotTop)
            },
            tooltipHeaderFormatter: function(n) {
                var f = n.series,
                    i = f.tooltipOptions,
                    e = i.dateTimeLabelFormats,
                    t = i.xDateFormat,
                    r = f.xAxis,
                    o = r && r.options.type === "datetime" && ni(n.key),
                    i = i.headerFormat,
                    r = r && r.closestPointRange,
                    u;
                if (o && !t) {
                    if (r) {
                        for (u in c)
                            if (c[u] >= r || c[u] <= c.day && n.key % c[u] > 0) {
                                t = e[u];
                                break
                            }
                    } else t = e.day;
                    t = t || e.year
                }
                return o && t && (i = i.replace("{point.key}", "{point.key:" + t + "}")), ur(i, {
                    point: n,
                    series: f
                })
            }
        }, gr = s.documentElement.ontouchstart !== u, sr = tt.Pointer = function(n, t) {
            this.init(n, t)
        }, sr.prototype = {
            init: function(n, t) {
                var i = t.chart,
                    f = i.events,
                    r = bt ? "" : i.zoomType,
                    i = n.inverted,
                    u;
                this.options = t;
                this.chart = n;
                this.zoomX = u = /x/.test(r);
                this.zoomY = r = /y/.test(r);
                this.zoomHor = u && !i || r && i;
                this.zoomVert = r && !i || u && i;
                this.hasZoom = u || r;
                this.runChartClick = f && !!f.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                tt.Tooltip && t.tooltip.enabled && (n.tooltip = new rf(n, t.tooltip), this.followTouchMove = t.tooltip.followTouchMove);
                this.setDOMEvents()
            },
            normalize: function(n, t) {
                var o, i, n = n || window.event,
                    n = ne(n);
                return n.target || (n.target = n.srcElement), i = n.touches ? n.touches.length ? n.touches.item(0) : n.changedTouches[0] : n, t || (this.chartPosition = t = gf(this.chart.container)), i.pageX === u ? (o = r(n.x, n.clientX - t.left), i = n.y) : (o = i.pageX - t.left, i = i.pageY - t.top), f(n, {
                    chartX: e(o),
                    chartY: e(i)
                })
            },
            getCoordinates: function(n) {
                var i = {
                    xAxis: [],
                    yAxis: []
                };
                return t(this.chart.axes, function(t) {
                    i[t.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: t,
                        value: t.toValue(n[t.horiz ? "chartX" : "chartY"])
                    })
                }), i
            },
            getIndex: function(n) {
                var t = this.chart;
                return t.inverted ? t.plotHeight + t.plotTop - n.chartY : n.chartX - t.plotLeft
            },
            runPointActions: function(i) {
                var c = this.chart,
                    r = c.series,
                    h = c.tooltip,
                    u, e, w = c.hoverPoint,
                    f = c.hoverSeries,
                    a, o, v = c.chartWidth,
                    y = this.getIndex(i);
                if (h && this.options.tooltip.shared && (!f || !f.noSharedTooltip)) {
                    for (e = [], a = r.length, o = 0; o < a; o++) r[o].visible && r[o].options.enableMouseTracking !== !1 && !r[o].noSharedTooltip && r[o].singularTooltips !== !0 && r[o].tooltipPoints.length && (u = r[o].tooltipPoints[y]) && u.series && (u._dist = p(y - u.clientX), v = l(v, u._dist), e.push(u));
                    for (a = e.length; a--;) e[a]._dist > v && e.splice(a, 1);
                    e.length && e[0].clientX !== this.hoverX && (h.refresh(e, i), this.hoverX = e[0].clientX)
                }
                if (r = f && f.tooltipOptions.followPointer, f && f.tracker && !r) {
                    if ((u = f.tooltipPoints[y]) && u !== w) u.onMouseOver(i)
                } else h && r && !h.isHidden && (f = h.getAnchor([{}], i), h.updatePosition({
                    plotX: f[0],
                    plotY: f[1]
                }));
                h && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function(n) {
                    if (ot[oi]) ot[oi].pointer.onDocumentMouseMove(n)
                }, b(s, "mousemove", this._onDocumentMouseMove));
                t(c.axes, function(t) {
                    t.drawCrosshair(i, n(u, w))
                })
            },
            reset: function(n, i) {
                var e = this.chart,
                    h = e.hoverSeries,
                    r = e.hoverPoint,
                    f = e.tooltip,
                    o = f && f.shared ? e.hoverPoints : r;
                (n = n && f && o) && si(o)[0].plotX === u && (n = !1);
                n ? (f.refresh(o), r && r.setState(r.state, !0)) : (r && r.onMouseOut(), h && h.onMouseOut(), f && f.hide(i), this._onDocumentMouseMove && (st(s, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null), t(e.axes, function(n) {
                    n.hideCrosshair()
                }), this.hoverX = null)
            },
            scaleGroups: function(n, i) {
                var r = this.chart,
                    u;
                t(r.series, function(t) {
                    u = n || t.getPlotBox();
                    t.xAxis && t.xAxis.zoomEnabled && (t.group.attr(u), t.markerGroup && (t.markerGroup.attr(u), t.markerGroup.clip(i ? r.clipRect : null)), t.dataLabelsGroup && t.dataLabelsGroup.attr(u))
                });
                r.clipRect.attr(i || r.clipBox)
            },
            dragStart: function(n) {
                var t = this.chart;
                t.mouseIsDown = n.type;
                t.cancelClick = !1;
                t.mouseDownX = this.mouseDownX = n.chartX;
                t.mouseDownY = this.mouseDownY = n.chartY
            },
            drag: function(n) {
                var i = this.chart,
                    e = i.options.chart,
                    t = n.chartX,
                    r = n.chartY,
                    a = this.zoomHor,
                    v = this.zoomVert,
                    u = i.plotLeft,
                    f = i.plotTop,
                    h = i.plotWidth,
                    c = i.plotHeight,
                    l, o = this.mouseDownX,
                    s = this.mouseDownY,
                    y = e.panKey && n[e.panKey + "Key"];
                t < u ? t = u : t > u + h && (t = u + h);
                r < f ? r = f : r > f + c && (r = f + c);
                this.hasDragged = Math.sqrt(Math.pow(o - t, 2) + Math.pow(s - r, 2));
                this.hasDragged > 10 && (l = i.isInsidePlot(o - u, s - f), i.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !y && !this.selectionMarker && (this.selectionMarker = i.renderer.rect(u, f, a ? 1 : h, v ? 1 : c, 0).attr({
                    fill: e.selectionMarkerFill || "rgba(69,114,167,0.25)",
                    zIndex: 7
                }).add()), this.selectionMarker && a && (t -= o, this.selectionMarker.attr({
                    width: p(t),
                    x: (t > 0 ? 0 : t) + o
                })), this.selectionMarker && v && (t = r - s, this.selectionMarker.attr({
                    height: p(t),
                    y: (t > 0 ? 0 : t) + s
                })), l && !this.selectionMarker && e.panning && i.pan(n, e.panning))
            },
            drop: function(n) {
                var u = this.chart,
                    e = this.hasPinched;
                if (this.selectionMarker) {
                    var o = {
                            xAxis: [],
                            yAxis: [],
                            originalEvent: n.originalEvent || n
                        },
                        i = this.selectionMarker,
                        s = i.attr ? i.attr("x") : i.x,
                        h = i.attr ? i.attr("y") : i.y,
                        v = i.attr ? i.attr("width") : i.width,
                        p = i.attr ? i.attr("height") : i.height,
                        c;
                    (this.hasDragged || e) && (t(u.axes, function(t) {
                        if (t.zoomEnabled) {
                            var i = t.horiz,
                                f = n.type === "touchend" ? t.minPixelPadding : 0,
                                u = t.toValue((i ? s : h) + f),
                                i = t.toValue((i ? s + v : h + p) - f);
                            isNaN(u) || isNaN(i) || (o[t.coll].push({
                                axis: t,
                                min: l(u, i),
                                max: r(u, i)
                            }), c = !0)
                        }
                    }), c && y(u, "selection", o, function(n) {
                        u.zoom(f(n, e ? {
                            animation: !1
                        } : null))
                    }));
                    this.selectionMarker = this.selectionMarker.destroy();
                    e && this.scaleGroups()
                }
                u && (a(u.container, {
                    cursor: u._cursor
                }), u.cancelClick = this.hasDragged > 10, u.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(n) {
                n = this.normalize(n);
                n.preventDefault && n.preventDefault();
                this.dragStart(n)
            },
            onDocumentMouseUp: function(n) {
                ot[oi] && ot[oi].pointer.drop(n)
            },
            onDocumentMouseMove: function(n) {
                var t = this.chart,
                    i = this.chartPosition,
                    r = t.hoverSeries,
                    n = this.normalize(n, i);
                i && r && !this.inClass(n.target, "highcharts-tracker") && !t.isInsidePlot(n.chartX - t.plotLeft, n.chartY - t.plotTop) && this.reset()
            },
            onContainerMouseLeave: function() {
                var n = ot[oi];
                n && (n.pointer.reset(), n.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(n) {
                var t = this.chart;
                oi = t.index;
                n = this.normalize(n);
                n.returnValue = !1;
                t.mouseIsDown === "mousedown" && this.drag(n);
                (this.inClass(n.target, "highcharts-tracker") || t.isInsidePlot(n.chartX - t.plotLeft, n.chartY - t.plotTop)) && !t.openMenu && this.runPointActions(n)
            },
            inClass: function(n, t) {
                for (var i; n;) {
                    if (i = g(n, "class")) {
                        if (i.indexOf(t) !== -1) return !0;
                        if (i.indexOf("highcharts-container") !== -1) return !1
                    }
                    n = n.parentNode
                }
            },
            onTrackerMouseOut: function(n) {
                var t = this.chart.hoverSeries,
                    i = (n = n.relatedTarget || n.toElement) && n.point && n.point.series;
                !t || t.options.stickyTracking || this.inClass(n, "highcharts-tooltip") || i === t || t.onMouseOut()
            },
            onContainerClick: function(n) {
                var t = this.chart,
                    i = t.hoverPoint,
                    r = t.plotLeft,
                    u = t.plotTop,
                    n = this.normalize(n);
                n.cancelBubble = !0;
                t.cancelClick || (i && this.inClass(n.target, "highcharts-tracker") ? (y(i.series, "click", f(n, {
                    point: i
                })), t.hoverPoint && i.firePointEvent("click", n)) : (f(n, this.getCoordinates(n)), t.isInsidePlot(n.chartX - r, n.chartY - u) && y(t, "click", n)))
            },
            setDOMEvents: function() {
                var n = this,
                    t = n.chart.container;
                t.onmousedown = function(t) {
                    n.onContainerMouseDown(t)
                };
                t.onmousemove = function(t) {
                    n.onContainerMouseMove(t)
                };
                t.onclick = function(t) {
                    n.onContainerClick(t)
                };
                b(t, "mouseleave", n.onContainerMouseLeave);
                nu === 1 && b(s, "mouseup", n.onDocumentMouseUp);
                gr && (t.ontouchstart = function(t) {
                    n.onContainerTouchStart(t)
                }, t.ontouchmove = function(t) {
                    n.onContainerTouchMove(t)
                }, nu === 1 && b(s, "touchend", n.onDocumentTouchEnd))
            },
            destroy: function() {
                var n;
                st(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                nu || (st(s, "mouseup", this.onDocumentMouseUp), st(s, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (n in this) this[n] = null
            }
        }, f(tt.Pointer.prototype, {
            pinchTranslate: function(n, t, i, r, u, f) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, n, t, i, r, u, f);
                (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, n, t, i, r, u, f)
            },
            pinchTranslateDirection: function(n, t, i, r, u, f, e, o) {
                var a = this.chart,
                    c = n ? "x" : "y",
                    d = n ? "X" : "Y",
                    v = "chart" + d,
                    rt = n ? "width" : "height",
                    g = a["plot" + (n ? "Left" : "Top")],
                    l, nt, s = o || 1,
                    tt = a.inverted,
                    y = a.bounds[n ? "h" : "v"],
                    w = t.length === 1,
                    b = t[0][v],
                    h = i[0][v],
                    ut = !w && t[1][v],
                    k = !w && i[1][v],
                    it, i = function() {
                        !w && p(b - ut) > 20 && (s = o || p(h - k) / p(b - ut));
                        nt = (g - h) / s + b;
                        l = a["plot" + (n ? "Width" : "Height")] / s
                    };
                i();
                t = nt;
                t < y.min ? (t = y.min, it = !0) : t + l > y.max && (t = y.max - l, it = !0);
                it ? (h -= .8 * (h - e[c][0]), w || (k -= .8 * (k - e[c][1])), i()) : e[c] = [h, k];
                tt || (f[c] = nt - g, f[rt] = l);
                f = tt ? 1 / s : s;
                u[rt] = l;
                u[c] = t;
                r[tt ? n ? "scaleY" : "scaleX" : "scale" + d] = s;
                r["translate" + d] = f * g + (h - f * b)
            },
            pinch: function(i) {
                var u = this,
                    o = u.chart,
                    e = u.pinchDown,
                    v = u.followTouchMove,
                    s = i.touches,
                    y = s.length,
                    h = u.lastValidTouch,
                    c = u.hasZoom,
                    a = u.selectionMarker,
                    p = {},
                    b = y === 1 && (u.inClass(i.target, "highcharts-tracker") && o.runTrackerClick || u.runChartClick),
                    w = {};
                (c || v) && !b && i.preventDefault();
                br(s, function(n) {
                    return u.normalize(n)
                });
                i.type === "touchstart" ? (t(s, function(n, t) {
                    e[t] = {
                        chartX: n.chartX,
                        chartY: n.chartY
                    }
                }), h.x = [e[0].chartX, e[1] && e[1].chartX], h.y = [e[0].chartY, e[1] && e[1].chartY], t(o.axes, function(t) {
                    if (t.zoomEnabled) {
                        var u = o.bounds[t.horiz ? "h" : "v"],
                            f = t.minPixelPadding,
                            i = t.toPixels(n(t.options.min, t.dataMin)),
                            e = t.toPixels(n(t.options.max, t.dataMax)),
                            s = l(i, e),
                            i = r(i, e);
                        u.min = l(t.pos, s - f);
                        u.max = r(t.pos + t.len, i + f)
                    }
                }), u.res = !0) : e.length && (a || (u.selectionMarker = a = f({
                    destroy: hi
                }, o.plotBox)), u.pinchTranslate(e, s, p, a, w, h), u.hasPinched = c, u.scaleGroups(p, w), !c && v && y === 1 ? this.runPointActions(u.normalize(i)) : u.res && (u.res = !1, this.reset(!1, 0)))
            },
            onContainerTouchStart: function(n) {
                var t = this.chart;
                oi = t.index;
                n.touches.length === 1 ? (n = this.normalize(n), t.isInsidePlot(n.chartX - t.plotLeft, n.chartY - t.plotTop) ? (this.runPointActions(n), this.pinch(n)) : this.reset()) : n.touches.length === 2 && this.pinch(n)
            },
            onContainerTouchMove: function(n) {
                (n.touches.length === 1 || n.touches.length === 2) && this.pinch(n)
            },
            onDocumentTouchEnd: function(n) {
                ot[oi] && ot[oi].pointer.drop(n)
            }
        }), k.PointerEvent || k.MSPointerEvent) {
        var ci = {},
            uf = !!k.PointerEvent,
            ue = function() {
                var n, t = [];
                t.item = function(n) {
                    return this[n]
                };
                for (n in ci) ci.hasOwnProperty(n) && t.push({
                    pageX: ci[n].pageX,
                    pageY: ci[n].pageY,
                    target: ci[n].target
                });
                return t
            },
            ff = function(n, t, i, r) {
                n = n.originalEvent || n;
                (n.pointerType === "touch" || n.pointerType === n.MSPOINTER_TYPE_TOUCH) && ot[oi] && (r(n), r = ot[oi].pointer, r[t]({
                    type: i,
                    target: n.currentTarget,
                    preventDefault: hi,
                    touches: ue()
                }))
            };
        f(sr.prototype, {
            onContainerPointerDown: function(n) {
                ff(n, "onContainerTouchStart", "touchstart", function(n) {
                    ci[n.pointerId] = {
                        pageX: n.pageX,
                        pageY: n.pageY,
                        target: n.currentTarget
                    }
                })
            },
            onContainerPointerMove: function(n) {
                ff(n, "onContainerTouchMove", "touchmove", function(n) {
                    ci[n.pointerId] = {
                        pageX: n.pageX,
                        pageY: n.pageY
                    };
                    ci[n.pointerId].target || (ci[n.pointerId].target = n.currentTarget)
                })
            },
            onDocumentPointerUp: function(n) {
                ff(n, "onContainerTouchEnd", "touchend", function(n) {
                    delete ci[n.pointerId]
                })
            },
            batchMSEvents: function(n) {
                n(this.chart.container, uf ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                n(this.chart.container, uf ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                n(s, uf ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
        });
        hr(sr.prototype, "init", function(n, t, i) {
            n.call(this, t, i);
            (this.hasZoom || this.followTouchMove) && a(t.container, {
                "-ms-touch-action": ut,
                "touch-action": ut
            })
        });
        hr(sr.prototype, "setDOMEvents", function(n) {
            n.apply(this);
            (this.hasZoom || this.followTouchMove) && this.batchMSEvents(b)
        });
        hr(sr.prototype, "destroy", function(n) {
            this.batchMSEvents(st);
            n.call(this)
        })
    }
    ru = tt.Legend = function(n, t) {
        this.init(n, t)
    };
    ru.prototype = {
        init: function(t, i) {
            var r = this,
                f = i.itemStyle,
                u = n(i.padding, 8),
                e = i.itemMarginTop || 0;
            this.options = i;
            i.enabled && (r.itemStyle = f, r.itemHiddenStyle = o(f, i.itemHiddenStyle), r.itemMarginTop = e, r.padding = u, r.initialItemX = u, r.initialItemY = u - 5, r.maxItemWidth = 0, r.chart = t, r.itemHeight = 0, r.lastLineHeight = 0, r.symbolWidth = n(i.symbolWidth, 16), r.pages = [], r.render(), b(r.chart, "endResize", function() {
                r.positionCheckboxes()
            }))
        },
        colorizeItem: function(n, t) {
            var f = this.options,
                r = n.legendItem,
                c = n.legendLine,
                e = n.legendSymbol,
                i = this.itemHiddenStyle.color,
                f = t ? f.itemStyle.color : i,
                o = t ? n.legendColor || n.color || "#CCC" : i,
                i = n.options && n.options.marker,
                s = {
                    fill: o
                },
                h;
            if (r && r.css({
                    fill: f,
                    color: f
                }), c && c.attr({
                    stroke: o
                }), e) {
                if (i && e.isMarker)
                    for (h in s.stroke = o, i = n.convertAttribs(i), i) r = i[h], r !== u && (s[h] = r);
                e.attr(s)
            }
        },
        positionItem: function(n) {
            var i = this.options,
                f = i.symbolPadding,
                i = !i.rtl,
                t = n._legendItemPos,
                r = t[0],
                t = t[1],
                u = n.checkbox;
            n.legendGroup && n.legendGroup.translate(i ? r : this.legendWidth - r - 2 * f - 4, t);
            u && (u.x = r, u.y = t)
        },
        destroyItem: function(n) {
            var i = n.checkbox;
            t(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(t) {
                n[t] && (n[t] = n[t].destroy())
            });
            i && ar(n.checkbox)
        },
        destroy: function() {
            var n = this.group,
                t = this.box;
            t && (this.box = t.destroy());
            n && (this.group = n.destroy())
        },
        positionCheckboxes: function(n) {
            var r = this.group.alignAttr,
                i, u = this.clipHeight || this.legendHeight;
            r && (i = r.translateY, t(this.allItems, function(t) {
                var f = t.checkbox,
                    e;
                f && (e = i + f.y + (n || 0) + 3, a(f, {
                    left: r.translateX + t.checkboxOffset + f.x - 20 + "px",
                    top: e + "px",
                    display: e > i - 6 && e < i + u - 6 ? "" : ut
                }))
            }))
        },
        renderTitle: function() {
            var n = this.padding,
                t = this.options.title,
                i = 0;
            t.text && (this.title || (this.title = this.chart.renderer.label(t.text, n - 3, n - 4, null, null, null, null, null, "legend-title").attr({
                zIndex: 1
            }).css(t.style).add(this.group)), n = this.title.getBBox(), i = n.height, this.offsetWidth = n.width, this.contentGroup.attr({
                translateY: i
            }));
            this.titleHeight = i
        },
        renderItem: function(t) {
            var w = this.chart,
                s = w.renderer,
                i = this.options,
                c = i.layout === "horizontal",
                u = this.symbolWidth,
                f = i.symbolPadding,
                y = this.itemStyle,
                b = this.itemHiddenStyle,
                k = this.padding,
                d = c ? n(i.itemDistance, 20) : 0,
                g = !i.rtl,
                nt = i.width,
                p = i.itemMarginBottom || 0,
                l = this.itemMarginTop,
                a = this.initialItemX,
                h = t.legendItem,
                tt = t.series && t.series.drawLegendSymbol ? t.series : t,
                v = tt.options,
                v = this.createCheckboxForItem && v && v.showCheckbox,
                it = i.useHTML;
            h || (t.legendGroup = s.g("legend-item").attr({
                zIndex: 1
            }).add(this.scrollGroup), t.legendItem = h = s.text(i.labelFormat ? ur(i.labelFormat, t) : i.labelFormatter.call(t), g ? u + f : -f, this.baseline || 0, it).css(o(t.visible ? y : b)).attr({
                align: g ? "left" : "right",
                zIndex: 2
            }).add(t.legendGroup), this.baseline || (this.baseline = s.fontMetrics(y.fontSize, h).f + 3 + l, h.attr("y", this.baseline)), tt.drawLegendSymbol(this, t), this.setItemEvents && this.setItemEvents(t, h, it, y, b), this.colorizeItem(t, t.visible), v && this.createCheckboxForItem(t));
            s = h.getBBox();
            u = t.checkboxOffset = i.itemWidth || t.legendItemWidth || u + f + s.width + d + (v ? 20 : 0);
            this.itemHeight = f = e(t.legendItemHeight || s.height);
            c && this.itemX - a + u > (nt || w.chartWidth - 2 * k - a - i.x) && (this.itemX = a, this.itemY += l + this.lastLineHeight + p, this.lastLineHeight = 0);
            this.maxItemWidth = r(this.maxItemWidth, u);
            this.lastItemY = l + this.itemY + p;
            this.lastLineHeight = r(f, this.lastLineHeight);
            t._legendItemPos = [this.itemX, this.itemY];
            c ? this.itemX += u : (this.itemY += l + f + p, this.lastLineHeight = f);
            this.offsetWidth = nt || r((c ? this.itemX - a - d : u) + k, this.offsetWidth)
        },
        getAllItems: function() {
            var r = [];
            return t(this.chart.series, function(t) {
                var f = t.options;
                n(f.showInLegend, i(f.linkedTo) ? !1 : u, !0) && (r = r.concat(t.legendItems || (f.legendType === "point" ? t.data : t)))
            }), r
        },
        render: function() {
            var n = this,
                a = n.chart,
                h = a.renderer,
                s = n.group,
                e, c, o, i, r = n.box,
                u = n.options,
                v = n.padding,
                l = u.borderWidth,
                y = u.backgroundColor;
            n.itemX = n.initialItemX;
            n.itemY = n.initialItemY;
            n.offsetWidth = 0;
            n.lastItemY = 0;
            s || (n.group = s = h.g("legend").attr({
                zIndex: 7
            }).add(), n.contentGroup = h.g().attr({
                zIndex: 1
            }).add(s), n.scrollGroup = h.g().add(n.contentGroup));
            n.renderTitle();
            e = n.getAllItems();
            yu(e, function(n, t) {
                return (n.options && n.options.legendIndex || 0) - (t.options && t.options.legendIndex || 0)
            });
            u.reversed && e.reverse();
            n.allItems = e;
            n.display = c = !!e.length;
            t(e, function(t) {
                n.renderItem(t)
            });
            o = u.width || n.offsetWidth;
            i = n.lastItemY + n.lastLineHeight + n.titleHeight;
            i = n.handleOverflow(i);
            (l || y) && (o += v, i += v, r ? o > 0 && i > 0 && (r[r.isNew ? "attr" : "animate"](r.crisp({
                width: o,
                height: i
            })), r.isNew = !1) : (n.box = r = h.rect(0, 0, o, i, u.borderRadius, l || 0).attr({
                stroke: u.borderColor,
                "stroke-width": l || 0,
                fill: y || ut
            }).add(s).shadow(u.shadow), r.isNew = !0), r[c ? "show" : "hide"]());
            n.legendWidth = o;
            n.legendHeight = i;
            t(e, function(t) {
                n.positionItem(t)
            });
            c && s.align(f({
                width: o,
                height: i
            }, u), !0, "spacingBox");
            a.isResizing || this.positionCheckboxes()
        },
        handleOverflow: function(i) {
            var h = this,
                w = this.chart,
                c = w.renderer,
                s = this.options,
                u = s.y,
                u = w.spacingBox.height + (s.verticalAlign === "top" ? -u : u) - this.padding,
                k = s.maxHeight,
                v, a = this.clipRect,
                b = s.navigation,
                d = n(b.animation, !0),
                y = b.arrowSize || 12,
                f = this.nav,
                o = this.pages,
                p, g = this.allItems;
            return s.layout === "horizontal" && (u /= 2), k && (u = l(u, k)), o.length = 0, i > u && !s.useHTML ? (this.clipHeight = v = r(u - 20 - this.titleHeight - this.padding, 0), this.currentPage = n(this.currentPage, 1), this.fullHeight = i, t(g, function(n, t) {
                var i = n._legendItemPos[1],
                    u = e(n.legendItem.getBBox().height),
                    r = o.length;
                (!r || i - o[r - 1] > v && (p || i) !== o[r - 1]) && (o.push(p || i), r++);
                t === g.length - 1 && i + u - o[r - 1] > v && o.push(i);
                i !== p && (p = i)
            }), a || (a = h.clipRect = c.clipRect(0, this.padding, 9999, 0), h.contentGroup.clip(a)), a.attr({
                height: v
            }), f || (this.nav = f = c.g().attr({
                zIndex: 1
            }).add(this.group), this.up = c.symbol("triangle", 0, 0, y, y).on("click", function() {
                h.scroll(-1, d)
            }).add(f), this.pager = c.text("", 15, 10).css(b.style).add(f), this.down = c.symbol("triangle-down", 0, 0, y, y).on("click", function() {
                h.scroll(1, d)
            }).add(f)), h.scroll(0), i = u) : f && (a.attr({
                height: w.chartHeight
            }), f.hide(), this.scrollGroup.attr({
                translateY: 1
            }), this.clipHeight = 0), i
        },
        scroll: function(n, t) {
            var r = this.pages,
                f = r.length,
                i = this.currentPage + n,
                s = this.clipHeight,
                e = this.options.navigation,
                o = e.activeColor,
                e = e.inactiveColor,
                h = this.pager,
                c = this.padding;
            i > f && (i = f);
            i > 0 && (t !== u && vr(t, this.chart), this.nav.attr({
                translateX: c,
                translateY: s + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({
                fill: i === 1 ? e : o
            }).css({
                cursor: i === 1 ? "default" : "pointer"
            }), h.attr({
                text: i + "/" + f
            }), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: i === f ? e : o
            }).css({
                cursor: i === f ? "default" : "pointer"
            }), r = -r[i - 1] + this.initialItemY, this.scrollGroup.animate({
                translateY: r
            }), this.currentPage = i, this.positionCheckboxes(r))
        }
    };
    d = tt.LegendSymbolMixin = {
        drawRectangle: function(n, t) {
            var i = n.options.symbolHeight || 12;
            t.legendSymbol = this.chart.renderer.rect(0, n.baseline - 5 - i / 2, n.symbolWidth, i, n.options.symbolRadius || 0).attr({
                zIndex: 3
            }).add(t.legendGroup)
        },
        drawLineMarker: function(n) {
            var t = this.options,
                r = t.marker,
                i = n.symbolWidth;
            var u = this.chart.renderer,
                o = this.legendGroup,
                n = n.baseline - e(u.fontMetrics(n.options.itemStyle.fontSize, this.legendItem).b * .3),
                f;
            t.lineWidth && (f = {
                "stroke-width": t.lineWidth
            }, t.dashStyle && (f.dashstyle = t.dashStyle), this.legendLine = u.path(["M", 0, n, "L", i, n]).attr(f).add(o));
            r && r.enabled !== !1 && (t = r.radius, this.legendSymbol = i = u.symbol(this.symbol, i / 2 - t, n - t, 2 * t, 2 * t).add(o), i.isMarker = !0)
        }
    };
    (/Trident\/7\.0/.test(li) || pr) && hr(ru.prototype, "positionItem", function(n, t) {
        var r = this,
            i = function() {
                t._legendItemPos && n.call(r, t)
            };
        i();
        setTimeout(i)
    });
    kr.prototype = {
        init: function(t, i) {
            var f, u = t.series,
                e, r, s;
            if (t.series = null, f = o(nt, t), f.series = t.series = u, this.userOptions = t, u = f.chart, this.margin = this.splashArray("margin", u), this.spacing = this.splashArray("spacing", u), e = u.events, this.bounds = {
                    h: {},
                    v: {}
                }, this.callback = i, this.isResizing = 0, this.options = f, this.axes = [], this.series = [], this.hasCartesianSeries = u.showAxes, r = this, r.index = ot.length, ot.push(r), nu++, u.reflow !== !1 && b(r, "load", function() {
                    r.initReflow()
                }), e)
                for (s in e) b(r, s, e[s]);
            r.xAxis = [];
            r.yAxis = [];
            r.animation = bt ? !1 : n(u.animation, !0);
            r.pointCount = r.colorCounter = r.symbolCounter = 0;
            r.firstRender()
        },
        initSeries: function(n) {
            var t = this.options.chart;
            return (t = w[n.type || t.type || t.defaultSeriesType]) || dt(17, !0), t = new t, t.init(this, n), t
        },
        isInsidePlot: function(n, t, i) {
            var r = i ? t : n,
                n = i ? n : t;
            return r >= 0 && r <= this.plotWidth && n >= 0 && n <= this.plotHeight
        },
        adjustTickAmounts: function() {
            this.options.chart.alignTicks !== !1 && t(this.axes, function(n) {
                n.adjustTickAmount()
            });
            this.maxTicks = null
        },
        redraw: function(n) {
            var u = this.axes,
                i = this.series,
                s = this.pointer,
                h = this.legend,
                c = this.isDirtyLegend,
                e, l, a = this.hasCartesianSeries,
                o = this.isDirtyBox,
                v = i.length,
                r = v,
                p = this.renderer,
                w = p.isHidden(),
                b = [];
            for (vr(n, this), w && this.cloneRenderTo(), this.layOutTitles(); r--;)
                if (n = i[r], n.options.stacking && (e = !0, n.isDirty)) {
                    l = !0;
                    break
                }
            if (l)
                for (r = v; r--;)(n = i[r], n.options.stacking) && (n.isDirty = !0);
            t(i, function(n) {
                n.isDirty && n.options.legendType === "point" && (c = !0)
            });
            c && h.options.enabled && (h.render(), this.isDirtyLegend = !1);
            e && this.getStacks();
            a && (this.isResizing || (this.maxTicks = null, t(u, function(n) {
                n.setScale()
            })), this.adjustTickAmounts());
            this.getMargins();
            a && (t(u, function(n) {
                n.isDirty && (o = !0)
            }), t(u, function(n) {
                n.isDirtyExtremes && (n.isDirtyExtremes = !1, b.push(function() {
                    y(n, "afterSetExtremes", f(n.eventArgs, n.getExtremes()));
                    delete n.eventArgs
                }));
                (o || e) && n.redraw()
            }));
            o && this.drawChartBox();
            t(i, function(n) {
                n.isDirty && n.visible && (!n.isCartesian || n.xAxis) && n.redraw()
            });
            s && s.reset(!0);
            p.draw();
            y(this, "redraw");
            w && this.cloneRenderTo(!0);
            t(b, function(n) {
                n.call()
            })
        },
        get: function(n) {
            for (var i = this.axes, r = this.series, u, t = 0; t < i.length; t++)
                if (i[t].options.id === n) return i[t];
            for (t = 0; t < r.length; t++)
                if (r[t].options.id === n) return r[t];
            for (t = 0; t < r.length; t++)
                for (u = r[t].points || [], i = 0; i < u.length; i++)
                    if (u[i].id === n) return u[i];
            return null
        },
        getAxes: function() {
            var r = this,
                n = this.options,
                i = n.xAxis = si(n.xAxis || {}),
                n = n.yAxis = si(n.yAxis || {});
            t(i, function(n, t) {
                n.index = t;
                n.isX = !0
            });
            t(n, function(n, t) {
                n.index = t
            });
            i = i.concat(n);
            t(i, function(n) {
                new ui(r, n)
            });
            r.adjustTickAmounts()
        },
        getSelectedPoints: function() {
            var n = [];
            return t(this.series, function(t) {
                n = n.concat(tf(t.points || [], function(n) {
                    return n.selected
                }))
            }), n
        },
        getSelectedSeries: function() {
            return tf(this.series, function(n) {
                return n.selected
            })
        },
        getStacks: function() {
            var i = this;
            t(i.yAxis, function(n) {
                n.stacks && n.hasVisibleSeries && (n.oldStacks = n.stacks)
            });
            t(i.series, function(t) {
                t.options.stacking && (t.visible === !0 || i.options.chart.ignoreHiddenSeries === !1) && (t.stackKey = t.type + n(t.options.stack, ""))
            })
        },
        setTitle: function(n, i, r) {
            var e, u = this,
                f = u.options,
                s;
            s = f.title = o(f.title, n);
            e = f.subtitle = o(f.subtitle, i);
            f = e;
            t([
                ["title", n, s],
                ["subtitle", i, f]
            ], function(n) {
                var t = n[0],
                    i = u[t],
                    r = n[1],
                    n = n[2];
                i && r && (u[t] = i = i.destroy());
                n && n.text && !i && (u[t] = u.renderer.text(n.text, 0, 0, n.useHTML).attr({
                    align: n.align,
                    "class": "highcharts-" + t,
                    zIndex: n.zIndex || 4
                }).css(n.style).add())
            });
            u.layOutTitles(r)
        },
        layOutTitles: function(t) {
            var u = 0,
                i = this.title,
                o = this.subtitle,
                e = this.options,
                r = e.title,
                e = e.subtitle,
                s = this.renderer,
                h = this.spacingBox.width - 44;
            !i || (i.css({
                width: (r.width || h) + "px"
            }).align(f({
                y: s.fontMetrics(r.style.fontSize, i).b - 3
            }, r), !1, "spacingBox"), r.floating || r.verticalAlign) || (u = i.getBBox().height);
            o && (o.css({
                width: (e.width || h) + "px"
            }).align(f({
                y: u + (r.margin - 13) + s.fontMetrics(r.style.fontSize, o).b
            }, e), !1, "spacingBox"), !e.floating && !e.verticalAlign && (u = fr(u + o.getBBox().height)));
            i = this.titleOffset !== u;
            this.titleOffset = u;
            !this.isDirtyBox && i && (this.isDirtyBox = i, this.hasRendered && n(t, !0) && this.isDirtyBox && this.redraw())
        },
        getChartSize: function() {
            var t = this.options.chart,
                u = t.width,
                t = t.height,
                f = this.renderToClone || this.renderTo;
            i(u) || (this.containerWidth = cu(f, "width"));
            i(t) || (this.containerHeight = cu(f, "height"));
            this.chartWidth = r(0, u || this.containerWidth || 600);
            this.chartHeight = r(0, n(t, this.containerHeight > 19 ? this.containerHeight : 400))
        },
        cloneRenderTo: function(n) {
            var t = this.renderToClone,
                i = this.container;
            n ? t && (this.renderTo.appendChild(i), ar(t), delete this.renderToClone) : (i && i.parentNode === this.renderTo && this.renderTo.removeChild(i), this.renderToClone = t = this.renderTo.cloneNode(0), a(t, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), t.style.setProperty && t.style.setProperty("display", "block", "important"), s.body.appendChild(t), i && t.appendChild(i))
        },
        getContainer: function() {
            var n, i = this.options.chart,
                t, r, u;
            this.renderTo = n = i.renderTo;
            u = "highcharts-" + wu++;
            tr(n) && (this.renderTo = n = s.getElementById(n));
            n || dt(13, !0);
            t = h(g(n, "data-highcharts-chart"));
            !isNaN(t) && ot[t] && ot[t].hasRendered && ot[t].destroy();
            g(n, "data-highcharts-chart", this.index);
            n.innerHTML = "";
            i.skipClone || n.offsetWidth || this.cloneRenderTo();
            this.getChartSize();
            t = this.chartWidth;
            r = this.chartHeight;
            this.container = n = ct(er, {
                className: "highcharts-container" + (i.className ? " " + i.className : ""),
                id: u
            }, f({
                position: "relative",
                overflow: "hidden",
                width: t + "px",
                height: r + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, i.style), this.renderToClone || n);
            this._cursor = n.style.cursor;
            this.renderer = i.forExport ? new ei(n, t, r, i.style, !0) : new dr(n, t, r, i.style);
            bt && this.renderer.create(this, n, t, r)
        },
        getMargins: function() {
            var e = this.spacing,
                o, s = this.legend,
                u = this.margin,
                f = this.options.legend,
                h = n(f.margin, 20),
                c = f.x,
                l = f.y,
                a = f.align,
                v = f.verticalAlign,
                y = this.titleOffset;
            this.resetMargins();
            o = this.axisOffset;
            y && !i(u[0]) && (this.plotTop = r(this.plotTop, y + this.options.title.margin + e[0]));
            s.display && !f.floating && (a === "right" ? i(u[1]) || (this.marginRight = r(this.marginRight, s.legendWidth - c + h + e[1])) : a === "left" ? i(u[3]) || (this.plotLeft = r(this.plotLeft, s.legendWidth + c + h + e[3])) : v === "top" ? i(u[0]) || (this.plotTop = r(this.plotTop, s.legendHeight + l + h + e[0])) : v !== "bottom" || i(u[2]) || (this.marginBottom = r(this.marginBottom, s.legendHeight - l + h + e[2])));
            this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
            this.extraTopMargin && (this.plotTop += this.extraTopMargin);
            this.hasCartesianSeries && t(this.axes, function(n) {
                n.getOffset()
            });
            i(u[3]) || (this.plotLeft += o[3]);
            i(u[0]) || (this.plotTop += o[0]);
            i(u[2]) || (this.marginBottom += o[2]);
            i(u[1]) || (this.marginRight += o[1]);
            this.setChartSize()
        },
        reflow: function(n) {
            var t = this,
                i = t.options.chart,
                r = t.renderTo,
                u = i.width || cu(r, "width"),
                f = i.height || cu(r, "height"),
                i = n ? n.target : k,
                r = function() {
                    t.container && (t.setSize(u, f, !1), t.hasUserSize = null)
                };
            !t.hasUserSize && u && f && (i === k || i === s) && ((u !== t.containerWidth || f !== t.containerHeight) && (clearTimeout(t.reflowTimeout), n ? t.reflowTimeout = setTimeout(r, 100) : r()), t.containerWidth = u, t.containerHeight = f)
        },
        initReflow: function() {
            var n = this,
                t = function(t) {
                    n.reflow(t)
                };
            b(k, "resize", t);
            b(n, "destroy", function() {
                st(k, "resize", t)
            })
        },
        setSize: function(n, u, f) {
            var o = this,
                s, h, c;
            o.isResizing += 1;
            c = function() {
                o && y(o, "endResize", null, function() {
                    o.isResizing -= 1
                })
            };
            vr(f, o);
            o.oldChartHeight = o.chartHeight;
            o.oldChartWidth = o.chartWidth;
            i(n) && (o.chartWidth = s = r(0, e(n)), o.hasUserSize = !!s);
            i(u) && (o.chartHeight = h = r(0, e(u)));
            (vi ? lu : a)(o.container, {
                width: s + "px",
                height: h + "px"
            }, vi);
            o.setChartSize(!0);
            o.renderer.setSize(s, h, f);
            o.maxTicks = null;
            t(o.axes, function(n) {
                n.isDirty = !0;
                n.setScale()
            });
            t(o.series, function(n) {
                n.isDirty = !0
            });
            o.isDirtyLegend = !0;
            o.isDirtyBox = !0;
            o.layOutTitles();
            o.getMargins();
            o.redraw(f);
            o.oldChartHeight = null;
            y(o, "resize");
            vi === !1 ? c() : setTimeout(c, vi && vi.duration || 500)
        },
        setChartSize: function(n) {
            var f = this.inverted,
                o = this.renderer,
                i = this.chartWidth,
                v = this.chartHeight,
                y = this.options.chart,
                u = this.spacing,
                s = this.clipOffset,
                l, a, h, c;
            this.plotLeft = l = e(this.plotLeft);
            this.plotTop = a = e(this.plotTop);
            this.plotWidth = h = r(0, e(i - l - this.marginRight));
            this.plotHeight = c = r(0, e(v - a - this.marginBottom));
            this.plotSizeX = f ? c : h;
            this.plotSizeY = f ? h : c;
            this.plotBorderWidth = y.plotBorderWidth || 0;
            this.spacingBox = o.spacingBox = {
                x: u[3],
                y: u[0],
                width: i - u[3] - u[1],
                height: v - u[0] - u[2]
            };
            this.plotBox = o.plotBox = {
                x: l,
                y: a,
                width: h,
                height: c
            };
            i = 2 * ft(this.plotBorderWidth / 2);
            f = fr(r(i, s[3]) / 2);
            o = fr(r(i, s[0]) / 2);
            this.clipBox = {
                x: f,
                y: o,
                width: ft(this.plotSizeX - r(i, s[1]) / 2 - f),
                height: r(0, ft(this.plotSizeY - r(i, s[2]) / 2 - o))
            };
            n || t(this.axes, function(n) {
                n.setAxisSize();
                n.setAxisTranslation()
            })
        },
        resetMargins: function() {
            var t = this.spacing,
                i = this.margin;
            this.plotTop = n(i[0], t[0]);
            this.marginRight = n(i[1], t[1]);
            this.marginBottom = n(i[2], t[2]);
            this.plotLeft = n(i[3], t[3]);
            this.axisOffset = [0, 0, 0, 0];
            this.clipOffset = [0, 0, 0, 0]
        },
        drawChartBox: function() {
            var n = this.options.chart,
                r = this.renderer,
                a = this.chartWidth,
                v = this.chartHeight,
                t = this.chartBackground,
                y = this.plotBackground,
                c = this.plotBorder,
                p = this.plotBGImage,
                u = n.borderWidth || 0,
                w = n.backgroundColor,
                b = n.plotBackgroundColor,
                k = n.plotBackgroundImage,
                f = n.plotBorderWidth || 0,
                i, e = this.plotLeft,
                o = this.plotTop,
                s = this.plotWidth,
                h = this.plotHeight,
                d = this.plotBox,
                g = this.clipRect,
                l = this.clipBox;
            i = u + (n.shadow ? 8 : 0);
            (u || w) && (t ? t.animate(t.crisp({
                width: a - i,
                height: v - i
            })) : (t = {
                fill: w || ut
            }, u && (t.stroke = n.borderColor, t["stroke-width"] = u), this.chartBackground = r.rect(i / 2, i / 2, a - i, v - i, n.borderRadius, u).attr(t).addClass("highcharts-background").add().shadow(n.shadow)));
            b && (y ? y.animate(d) : this.plotBackground = r.rect(e, o, s, h, 0).attr({
                fill: b
            }).add().shadow(n.plotShadow));
            k && (p ? p.animate(d) : this.plotBGImage = r.image(k, e, o, s, h).add());
            g ? g.animate({
                width: l.width,
                height: l.height
            }) : this.clipRect = r.clipRect(l);
            f && (c ? c.animate(c.crisp({
                x: e,
                y: o,
                width: s,
                height: h,
                strokeWidth: -f
            })) : this.plotBorder = r.rect(e, o, s, h, 0, -f).attr({
                stroke: n.plotBorderColor,
                "stroke-width": f,
                fill: ut,
                zIndex: 1
            }).add());
            this.isDirtyBox = !1
        },
        propFromSeries: function() {
            var i = this,
                u = i.options.chart,
                n, f = i.options.series,
                e, r;
            t(["inverted", "angular", "polar"], function(t) {
                for (n = w[u.type || u.defaultSeriesType], r = i[t] || u[t] || n && n.prototype[t], e = f && f.length; !r && e--;)(n = w[f[e].type]) && n.prototype[t] && (r = !0);
                i[t] = r
            })
        },
        linkSeries: function() {
            var n = this,
                i = n.series;
            t(i, function(n) {
                n.linkedSeries.length = 0
            });
            t(i, function(t) {
                var i = t.options.linkedTo;
                tr(i) && (i = i === ":previous" ? n.series[t.index - 1] : n.get(i)) && (i.linkedSeries.push(t), t.linkedParent = i)
            })
        },
        renderSeries: function() {
            t(this.series, function(n) {
                n.translate();
                n.setTooltipPoints && n.setTooltipPoints();
                n.render()
            })
        },
        renderLabels: function() {
            var n = this,
                i = n.options.labels;
            i.items && t(i.items, function(t) {
                var r = f(i.style, t.style),
                    u = h(r.left) + n.plotLeft,
                    e = h(r.top) + n.plotTop + 12;
                delete r.left;
                delete r.top;
                n.renderer.text(t.html, u, e).attr({
                    zIndex: 2
                }).css(r).add()
            })
        },
        render: function() {
            var n = this.axes,
                r = this.renderer,
                i = this.options;
            this.setTitle();
            this.legend = new ru(this, i.legend);
            this.getStacks();
            t(n, function(n) {
                n.setScale()
            });
            this.getMargins();
            this.maxTicks = null;
            t(n, function(n) {
                n.setTickPositions(!0);
                n.setMaxTicks()
            });
            this.adjustTickAmounts();
            this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries && t(n, function(n) {
                n.render()
            });
            this.seriesGroup || (this.seriesGroup = r.g("series-group").attr({
                zIndex: 3
            }).add());
            this.renderSeries();
            this.renderLabels();
            this.showCredits(i.credits);
            this.hasRendered = !0
        },
        showCredits: function(n) {
            n.enabled && !this.credits && (this.credits = this.renderer.text(n.text, 0, 0).on("click", function() {
                n.href && (location.href = n.href)
            }).attr({
                align: n.position.align,
                zIndex: 8
            }).css(n.style).add().align(n.position))
        },
        destroy: function() {
            var n = this,
                f = n.axes,
                e = n.series,
                r = n.container,
                i, o = r && r.parentNode;
            for (y(n, "destroy"), ot[n.index] = u, nu--, n.renderTo.removeAttribute("data-highcharts-chart"), st(n), i = f.length; i--;) f[i] = f[i].destroy();
            for (i = e.length; i--;) e[i] = e[i].destroy();
            t("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(t) {
                var i = n[t];
                i && i.destroy && (n[t] = i.destroy())
            });
            r && (r.innerHTML = "", st(r), o && ar(r));
            for (i in n) delete n[i]
        },
        isReadyToRender: function() {
            var n = this;
            return !vt && k == k.top && s.readyState !== "complete" || bt && !k.canvg ? (bt ? pf.push(function() {
                n.firstRender()
            }, n.options.global.canvasToolsURL) : s.attachEvent("onreadystatechange", function() {
                s.detachEvent("onreadystatechange", n.firstRender);
                s.readyState === "complete" && n.firstRender()
            }), !1) : !0
        },
        firstRender: function() {
            var n = this,
                i = n.options,
                r = n.callback;
            n.isReadyToRender() && (n.getContainer(), y(n, "init"), n.resetMargins(), n.setChartSize(), n.propFromSeries(), n.getAxes(), t(i.series || [], function(t) {
                n.initSeries(t)
            }), n.linkSeries(), y(n, "beforeRender"), tt.Pointer && (n.pointer = new sr(n, i)), n.render(), n.renderer.draw(), r && r.apply(n, [n]), t(n.callbacks, function(t) {
                t.apply(n, [n])
            }), n.cloneRenderTo(!0), y(n, "load"))
        },
        splashArray: function(t, i) {
            var r = i[t],
                r = yt(r) ? r : [r, r, r, r];
            return [n(i[t + "Top"], r[0]), n(i[t + "Right"], r[1]), n(i[t + "Bottom"], r[2]), n(i[t + "Left"], r[3])]
        }
    };
    kr.prototype.callbacks = [];
    ht = tt.CenteredSeriesMixin = {
        getCenter: function() {
            var t = this.options,
                i = this.chart,
                r = 2 * (t.slicedOffset || 0),
                f, e = i.plotWidth - 2 * r,
                o = i.plotHeight - 2 * r,
                i = t.center,
                t = [n(i[0], "50%"), n(i[1], "50%"), t.size || "100%", t.innerSize || 0],
                s = l(e, o),
                u;
            return br(t, function(n, t) {
                return u = /%$/.test(n), f = t < 2 || t === 2 && u, (u ? [e, o, s, s][t] * h(n) / 100 : n) + (f ? r : 0)
            })
        }
    };
    pi = function() {};
    pi.prototype = {
        init: function(n, t, i) {
            return this.series = n, this.applyOptions(t, i), this.pointAttr = {}, n.options.colorByPoint && (t = n.options.colors || n.chart.options.colors, this.color = this.color || t[n.colorCounter++], n.colorCounter === t.length) && (n.colorCounter = 0), n.chart.pointCount++, this
        },
        applyOptions: function(n, t) {
            var i = this.series,
                r = i.options.pointValKey || i.pointValKey,
                n = pi.prototype.optionsToObject.call(this, n);
            return f(this, n), this.options = this.options ? f(this.options, n) : n, r && (this.y = this[r]), this.x === u && i && (this.x = t === u ? i.autoIncrement() : t), this
        },
        optionsToObject: function(n) {
            var t = {},
                i = this.series,
                r = i.pointArrayMap || ["y"],
                u = r.length,
                f = 0,
                e = 0;
            if (typeof n == "number" || n === null) t[r[0]] = n;
            else if (ir(n))
                for (n.length > u && (i = typeof n[0], i === "string" ? t.name = n[0] : i === "number" && (t.x = n[0]), f++); e < u;) t[r[e++]] = n[f++];
            else typeof n == "object" && (t = n, n.dataLabels && (i._hasPointLabels = !0), n.marker && (i._hasPointMarkers = !0));
            return t
        },
        destroy: function() {
            var n = this.series.chart,
                t = n.hoverPoints,
                i;
            n.pointCount--;
            t && (this.setState(), ii(t, this), !t.length) && (n.hoverPoints = null);
            this === n.hoverPoint && this.onMouseOut();
            (this.graphic || this.dataLabel) && (st(this), this.destroyElements());
            this.legendItem && n.legend.destroyItem(this);
            for (i in this) this[i] = null
        },
        destroyElements: function() {
            for (var i = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), n, t = 6; t--;) n = i[t], this[n] && (this[n] = this[n].destroy())
        },
        getLabelConfig: function() {
            return {
                x: this.category,
                y: this.y,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        },
        tooltipFormatter: function(i) {
            var u = this.series,
                r = u.tooltipOptions,
                o = n(r.valueDecimals, ""),
                f = r.valuePrefix || "",
                e = r.valueSuffix || "";
            return t(u.pointArrayMap || ["y"], function(n) {
                n = "{point." + n;
                (f || e) && (i = i.replace(n + "}", f + n + "}" + e));
                i = i.replace(n + "}", n + ":,." + o + "f}")
            }), ur(i, {
                point: this,
                series: this.series
            })
        },
        firePointEvent: function(n, t, i) {
            var r = this,
                u = this.series.options;
            (u.point.events[n] || r.options && r.options.events && r.options.events[n]) && this.importEvents();
            n === "click" && u.allowPointSelect && (i = function(n) {
                r.select(null, n.ctrlKey || n.metaKey || n.shiftKey)
            });
            y(this, n, t, i)
        }
    };
    v = function() {};
    v.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: pi,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            r: "radius"
        },
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function(i, r) {
            var u = this,
                s, e, o = i.series,
                h = function(t, i) {
                    return n(t.options.index, t._i) - n(i.options.index, i._i)
                };
            u.chart = i;
            u.options = r = u.setOptions(r);
            u.linkedSeries = [];
            u.bindAxes();
            f(u, {
                name: r.name,
                state: "",
                pointAttr: {},
                visible: r.visible !== !1,
                selected: r.selected === !0
            });
            bt && (r.animation = !1);
            e = r.events;
            for (s in e) b(u, s, e[s]);
            (e && e.click || r.point && r.point.events && r.point.events.click || r.allowPointSelect) && (i.runTrackerClick = !0);
            u.getColor();
            u.getSymbol();
            t(u.parallelArrays, function(n) {
                u[n + "Data"] = []
            });
            u.setData(r.data, !1);
            u.isCartesian && (i.hasCartesianSeries = !0);
            o.push(u);
            u._i = o.length - 1;
            yu(o, h);
            this.yAxis && yu(this.yAxis.series, h);
            t(o, function(n, t) {
                n.index = t;
                n.name = n.name || "Series " + (t + 1)
            })
        },
        bindAxes: function() {
            var n = this,
                i = n.options,
                f = n.chart,
                r;
            t(n.axisTypes || [], function(e) {
                t(f[e], function(t) {
                    r = t.options;
                    (i[e] === r.index || i[e] !== u && i[e] === r.id || i[e] === u && r.index === 0) && (t.series.push(n), n[e] = t, t.isDirty = !0)
                });
                n[e] || n.optionalAxis === e || dt(18, !0)
            })
        },
        updateParallelArrays: function(n, i) {
            var r = n.series,
                u = arguments;
            t(r.parallelArrays, typeof i == "number" ? function(t) {
                var u = t === "y" && r.toYData ? r.toYData(n) : n[t];
                r[t + "Data"][i] = u
            } : function(n) {
                Array.prototype[i].apply(r[n + "Data"], Array.prototype.slice.call(u, 2))
            })
        },
        autoIncrement: function() {
            var i = this.options,
                t = this.xIncrement,
                t = n(t, i.pointStart, 0);
            return this.pointInterval = n(this.pointInterval, i.pointInterval, 1), this.xIncrement = t + this.pointInterval, t
        },
        getSegments: function() {
            var i = -1,
                r = [],
                u, n = this.points,
                f = n.length;
            if (f)
                if (this.options.connectNulls) {
                    for (u = f; u--;) n[u].y === null && n.splice(u, 1);
                    n.length && (r = [n])
                } else t(n, function(t, u) {
                    t.y === null ? (u > i + 1 && r.push(n.slice(i + 1, u)), i = u) : u === f - 1 && r.push(n.slice(i + 1, u + 1))
                });
            this.segments = r
        },
        setOptions: function(n) {
            var i = this.chart,
                t = i.options.plotOptions,
                i = i.userOptions || {},
                r = i.plotOptions || {},
                u = t[this.type];
            return this.userOptions = n, t = o(u, t.series, n), this.tooltipOptions = o(nt.tooltip, nt.plotOptions[this.type].tooltip, i.tooltip, r.series && r.series.tooltip, r[this.type] && r[this.type].tooltip, n.tooltip), u.marker === null && delete t.marker, t
        },
        getCyclic: function(n, t, r) {
            var u = this.userOptions,
                f = "_" + n + "Index",
                e = n + "Counter";
            t || (i(u[f]) ? t = u[f] : (u[f] = t = this.chart[e] % r.length, this.chart[e] += 1), t = r[t]);
            this[n] = t
        },
        getColor: function() {
            this.options.colorByPoint || this.getCyclic("color", this.options.color || at[this.type].color, this.chart.options.colors)
        },
        getSymbol: function() {
            var n = this.options.marker;
            this.getCyclic("symbol", n.symbol, this.chart.options.symbols);
            /^url/.test(this.symbol) && (n.radius = 0)
        },
        drawLegendSymbol: d.drawLineMarker,
        setData: function(i, r, f, e) {
            var o = this,
                c = o.points,
                w = c && c.length || 0,
                h, s = o.options,
                b = o.chart,
                v = null,
                l = o.xAxis,
                a = l && !!l.categories,
                k = o.tooltipPoints,
                d = s.turboThreshold,
                p = this.xData,
                y = this.yData,
                g = (h = o.pointArrayMap) && h.length,
                i = i || [];
            if (h = i.length, r = n(r, !0), e === !1 || !h || w !== h || o.cropped || o.hasGroupedData) {
                if (o.xIncrement = null, o.pointRange = a ? 1 : s.pointRange, o.colorCounter = 0, t(this.parallelArrays, function(n) {
                        o[n + "Data"].length = 0
                    }), d && h > d) {
                    for (f = 0; v === null && f < h;) v = i[f], f++;
                    if (ni(v)) {
                        for (a = n(s.pointStart, 0), s = n(s.pointInterval, 1), f = 0; f < h; f++) p[f] = a, y[f] = i[f], a += s;
                        o.xIncrement = a
                    } else if (ir(v))
                        if (g)
                            for (f = 0; f < h; f++) s = i[f], p[f] = s[0], y[f] = s.slice(1, g + 1);
                        else
                            for (f = 0; f < h; f++) s = i[f], p[f] = s[0], y[f] = s[1];
                    else dt(12)
                } else
                    for (f = 0; f < h; f++) i[f] !== u && (s = {
                        series: o
                    }, o.pointClass.prototype.applyOptions.apply(s, [i[f]]), o.updateParallelArrays(s, f), a && s.name) && (l.names[s.x] = s.name);
                for (tr(y[0]) && dt(14, !0), o.data = [], o.options.data = i, f = w; f--;) c[f] && c[f].destroy && c[f].destroy();
                k && (k.length = 0);
                l && (l.minRange = l.userMinRange);
                o.isDirty = o.isDirtyData = b.isDirtyBox = !0;
                f = !1
            } else t(i, function(n, t) {
                c[t].update(n, !1, null, !1)
            });
            r && b.redraw(f)
        },
        processData: function(n) {
            var t = this.xData,
                l = this.yData,
                r = t.length,
                e, a, o, h, i, v, c, y, f, s;
            if (e = 0, h = this.xAxis, v = this.options, i = v.cropThreshold, c = 0, y = this.isCartesian, y && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !n) return !1;
            for (h && (f = h.getExtremes(), s = f.min, f = f.max), y && this.sorted && (!i || r > i || this.forceCrop) && (t[r - 1] < s || t[0] > f ? (t = [], l = []) : (t[0] < s || t[r - 1] > f) && (e = this.cropData(this.xData, this.yData, s, f), t = e.xData, l = e.yData, e = e.start, a = !0, c = t.length)), i = t.length - 1; i >= 0; i--) r = t[i] - t[i - 1], !a && t[i] > s && t[i] < f && c++, r > 0 && (o === u || r < o) ? o = r : r < 0 && this.requireSorting && dt(15);
            this.cropped = a;
            this.cropStart = e;
            this.processedXData = t;
            this.processedYData = l;
            this.activePointCount = c;
            v.pointRange === null && (this.pointRange = o || 1);
            this.closestPointRange = o
        },
        cropData: function(t, i, u, f) {
            for (var h = t.length, o = 0, s = h, c = n(this.cropShoulder, 1), e = 0; e < h; e++)
                if (t[e] >= u) {
                    o = r(0, e - c);
                    break
                }
            for (; e < h; e++)
                if (t[e] > f) {
                    s = e + c;
                    break
                }
            return {
                xData: t.slice(o, s),
                yData: i.slice(o, s),
                start: o,
                end: s
            }
        },
        generatePoints: function() {
            var e = this.options.data,
                t = this.data,
                c, o = this.processedXData,
                v = this.processedYData,
                l = this.pointClass,
                s = o.length,
                a = this.cropStart || 0,
                i, r = this.hasGroupedData,
                h, f = [],
                n;
            for (t || r || (t = [], t.length = e.length, t = this.data = t), n = 0; n < s; n++) i = a + n, r ? f[n] = (new l).init(this, [o[n]].concat(si(v[n]))) : (t[i] ? h = t[i] : e[i] !== u && (t[i] = h = (new l).init(this, e[i], o[n])), f[n] = h), f[n].index = i;
            if (t && (s !== (c = t.length) || r))
                for (n = 0; n < c; n++)(n === a && !r && (n += s), t[n]) && (t[n].destroyElements(), t[n].plotX = u);
            this.data = t;
            this.points = f
        },
        getExtremes: function(t) {
            var l = this.yAxis,
                h = this.processedXData,
                e, s = [],
                c = 0;
            e = this.xAxis.getExtremes();
            var a = e.min,
                v = e.max,
                f, o, i, r, t = t || this.stackedYData || this.processedYData;
            for (e = t.length, r = 0; r < e; r++)
                if (o = h[r], i = t[r], f = i !== null && i !== u && (!l.isLog || i.length || i > 0), o = this.getExtremesFromAll || this.cropped || (h[r + 1] || o) >= a && (h[r - 1] || o) <= v, f && o)
                    if (f = i.length)
                        for (; f--;) i[f] !== null && (s[c++] = i[f]);
                    else s[c++] = i;
            this.dataMin = n(void 0, cr(s));
            this.dataMax = n(void 0, ki(s))
        },
        translate: function() {
            this.processedXData || this.processData();
            this.generatePoints();
            for (var e = this.options, y = e.stacking, c = this.xAxis, l = c.categories, s = this.yAxis, p = this.points, w = p.length, b = !!this.modifyValue, a = e.pointPlacement, k = a === "between" || ni(a), v = e.threshold, e = 0; e < w; e++) {
                var t = p[e],
                    h = t.x,
                    r = t.y,
                    o = t.low,
                    f = y && s.stacks[(this.negStacks && r < v ? "-" : "") + this.stackKey];
                s.isLog && r <= 0 && (t.y = r = null, dt(10));
                t.plotX = c.translate(h, 0, 0, 0, 1, a, this.type === "flags");
                y && this.visible && f && f[h] && (f = f[h], r = f.points[this.index + "," + e], o = r[0], r = r[1], o === 0 && (o = n(v, s.min)), s.isLog && o <= 0 && (o = null), t.total = t.stackTotal = f.total, t.percentage = f.total && t.y / f.total * 100, t.stackY = r, f.setOffset(this.pointXOffset || 0, this.barW || 0));
                t.yBottom = i(o) ? s.translate(o, 0, 1, 0, 1) : null;
                b && (r = this.modifyValue(r, t));
                t.plotY = typeof r == "number" && r !== Infinity ? s.translate(r, 0, 1, 0, 1) : u;
                t.clientX = k ? c.translate(h, 0, 0, 0, 1) : t.plotX;
                t.negative = t.y < (v || 0);
                t.category = l && l[t.x] !== u ? l[t.x] : t.x
            }
            this.getSegments()
        },
        animate: function(n) {
            var t = this.chart,
                o = t.renderer,
                i, u, e, r;
            i = this.options.animation;
            u = this.clipBox || t.clipBox;
            e = t.inverted;
            i && !yt(i) && (i = at[this.type].animation);
            r = ["_sharedClip", i.duration, i.easing, u.height].join(",");
            n ? (n = t[r], i = t[r + "m"], n || (t[r] = n = o.clipRect(f(u, {
                width: 0
            })), t[r + "m"] = i = o.clipRect(-99, e ? -t.plotLeft : -t.plotTop, 99, e ? t.chartWidth : t.chartHeight)), this.group.clip(n), this.markerGroup.clip(i), this.sharedClipKey = r) : ((n = t[r]) && n.animate({
                width: t.plotSizeX
            }, i), t[r + "m"] && t[r + "m"].animate({
                width: t.plotSizeX + 99
            }, i), this.animate = null)
        },
        afterAnimate: function() {
            var n = this.chart,
                t = this.sharedClipKey,
                r = this.group,
                i = this.clipBox;
            r && this.options.clip !== !1 && (t && i || r.clip(i ? n.renderer.clipRect(i) : n.clipRect), this.markerGroup.clip());
            y(this, "afterAnimate");
            setTimeout(function() {
                t && n[t] && (i || (n[t] = n[t].destroy()), n[t + "m"] && (n[t + "m"] = n[t + "m"].destroy()))
            }, 100)
        },
        drawPoints: function() {
            var s, w = this.points,
                a = this.chart,
                c, r, v, t, i, y, b, o, l = this.options.marker,
                d = this.pointAttr[""],
                h, k, p, g = this.markerGroup,
                nt = n(l.enabled, !this.requireSorting || this.activePointCount < .5 * this.xAxis.len / l.radius);
            if (l.enabled !== !1 || this._hasPointMarkers)
                for (v = w.length; v--;)(t = w[v], c = ft(t.plotX), r = t.plotY, o = t.graphic, h = t.marker || {}, k = !!t.marker, s = nt && h.enabled === u || h.enabled, p = a.isInsidePlot(e(c), r, a.inverted), s && r !== u && !isNaN(r) && t.y !== null) ? (s = t.pointAttr[t.selected ? "select" : ""] || d, i = s.r, y = n(h.symbol, this.symbol), b = y.indexOf("url") === 0, o) ? o[p ? "show" : "hide"](!0).animate(f({
                    x: c - i,
                    y: r - i
                }, o.symbolName ? {
                    width: 2 * i,
                    height: 2 * i
                } : {})) : p && (i > 0 || b) && (t.graphic = a.renderer.symbol(y, c - i, r - i, 2 * i, 2 * i, k ? h : l).attr(s).add(g)) : o && (t.graphic = o.destroy())
        },
        convertAttribs: function(t, i, r, u) {
            var e = this.pointAttrToOptions,
                f, o, s = {},
                t = t || {},
                i = i || {},
                r = r || {},
                u = u || {};
            for (f in e) o = e[f], s[f] = n(t[o], i[f], r[f], u[f]);
            return s
        },
        getAttribs: function() {
            var e = this,
                c = e.options,
                r = at[e.type].marker ? c.marker : c,
                l = r.states,
                o = l.hover,
                s, a = e.color,
                w;
            s = {
                stroke: a,
                fill: a
            };
            var v = e.points || [],
                n, h = [],
                u, y = e.pointAttrToOptions;
            u = e.hasPointSpecificOptions;
            var p = c.negativeColor,
                b = r.lineColor,
                k = r.fillColor;
            if (n = c.turboThreshold, c.marker ? (o.radius = o.radius || r.radius + o.radiusPlus, o.lineWidth = o.lineWidth || r.lineWidth + o.lineWidthPlus) : o.color = o.color || yi(o.color || a).brighten(o.brightness).get(), h[""] = e.convertAttribs(r, s), t(["hover", "select"], function(n) {
                    h[n] = e.convertAttribs(l[n], h[""])
                }), e.pointAttr = h, a = v.length, !n || a < n || u)
                for (; a--;) {
                    if (n = v[a], (r = n.options && n.options.marker || n.options) && r.enabled === !1 && (r.radius = 0), n.negative && p && (n.color = n.fillColor = p), u = c.colorByPoint || n.color, n.options)
                        for (w in y) i(r[y[w]]) && (u = !0);
                    u ? (r = r || {}, u = [], l = r.states || {}, s = l.hover = l.hover || {}, c.marker || (s.color = s.color || !n.options.color && o.color || yi(n.color).brighten(s.brightness || o.brightness).get()), s = {
                        color: n.color
                    }, k || (s.fillColor = n.color), b || (s.lineColor = n.color), u[""] = e.convertAttribs(f(s, r), h[""]), u.hover = e.convertAttribs(l.hover, h.hover, u[""]), u.select = e.convertAttribs(l.select, h.select, u[""])) : u = h;
                    n.pointAttr = u
                }
        },
        destroy: function() {
            var n = this,
                r = n.chart,
                h = /AppleWebKit\/533/.test(li),
                e, u, o = n.data || [],
                f, s, i;
            for (y(n, "destroy"), st(n), t(n.axisTypes || [], function(t) {
                    (i = n[t]) && (ii(i.series, n), i.isDirty = i.forceRedraw = !0)
                }), n.legendItem && n.chart.legend.destroyItem(n), u = o.length; u--;)(f = o[u]) && f.destroy && f.destroy();
            n.points = null;
            clearTimeout(n.animationTimeout);
            t("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(t) {
                n[t] && (e = h && t === "group" ? "hide" : "destroy", n[t][e]())
            });
            r.hoverSeries === n && (r.hoverSeries = null);
            ii(r.series, n);
            for (s in n) delete n[s]
        },
        getSegmentPath: function(n) {
            var r = this,
                i = [],
                u = r.options.step;
            return t(n, function(t, f) {
                var o = t.plotX,
                    s = t.plotY,
                    e;
                r.getPointSpline ? i.push.apply(i, r.getPointSpline(n, t, f)) : (i.push(f ? "L" : "M"), u && f && (e = n[f - 1], u === "right" ? i.push(e.plotX, s) : u === "center" ? i.push((e.plotX + o) / 2, e.plotY, (e.plotX + o) / 2, s) : i.push(o, e.plotY)), i.push(t.plotX, t.plotY))
            }), i
        },
        getGraphPath: function() {
            var n = this,
                i = [],
                r, u = [];
            return t(n.segments, function(t) {
                r = n.getSegmentPath(t);
                t.length > 1 ? i = i.concat(r) : u.push(t[0])
            }), n.singlePoints = u, n.graphPath = i
        },
        drawGraph: function() {
            var i = this,
                n = this.options,
                u = [
                    ["graph", n.lineColor || this.color]
                ],
                f = n.lineWidth,
                e = n.dashStyle,
                s = n.linecap !== "square",
                r = this.getGraphPath(),
                o = n.negativeColor;
            o && u.push(["graphNeg", o]);
            t(u, function(t, u) {
                var h = t[0],
                    o = i[h];
                o ? (iu(o), o.animate({
                    d: r
                })) : f && r.length && (o = {
                    stroke: t[1],
                    "stroke-width": f,
                    fill: ut,
                    zIndex: 1
                }, e ? o.dashstyle = e : s && (o["stroke-linecap"] = o["stroke-linejoin"] = "round"), i[h] = i.chart.renderer.path(r).attr(o).add(i.group).shadow(!u && n.shadow))
            })
        },
        clipNeg: function() {
            var f = this.options,
                n = this.chart,
                h = n.renderer,
                t = f.negativeColor || f.negativeFillColor,
                i, c = this.graph,
                l = this.area,
                o = this.posClip,
                s = this.negClip;
            i = n.chartWidth;
            var a = n.chartHeight,
                u = r(i, a),
                v = this.yAxis;
            t && (c || l) && (t = e(v.toPixels(f.threshold || 0, !0)), t < 0 && (u -= t), f = {
                x: 0,
                y: 0,
                width: u,
                height: t
            }, u = {
                x: 0,
                y: t,
                width: u,
                height: u
            }, n.inverted && (f.height = u.y = n.plotWidth - t, h.isVML && (f = {
                x: n.plotWidth - t - n.plotLeft,
                y: 0,
                width: i,
                height: a
            }, u = {
                x: t + n.plotLeft - i,
                y: 0,
                width: n.plotLeft + t,
                height: i
            })), v.reversed ? (n = u, i = f) : (n = f, i = u), o ? (o.animate(n), s.animate(i)) : (this.posClip = o = h.clipRect(n), this.negClip = s = h.clipRect(i), c && this.graphNeg && (c.clip(o), this.graphNeg.clip(s)), l && (l.clip(o), this.areaNeg.clip(s))))
        },
        invertGroups: function() {
            function i() {
                var i = {
                    width: n.yAxis.len,
                    height: n.xAxis.len
                };
                t(["group", "markerGroup"], function(t) {
                    n[t] && n[t].attr(i).invert()
                })
            }
            var n = this,
                r = n.chart;
            n.xAxis && (b(r, "resize", i), b(n, "destroy", function() {
                st(r, "resize", i)
            }), i(), n.invertGroups = i)
        },
        plotGroup: function(n, t, i, r, u) {
            var f = this[n],
                e = !f;
            return e && (this[n] = f = this.chart.renderer.g(t).attr({
                visibility: i,
                zIndex: r || .1
            }).add(u)), f[e ? "attr" : "animate"](this.getPlotBox()), f
        },
        getPlotBox: function() {
            var t = this.chart,
                i = this.xAxis,
                n = this.yAxis;
            return t.inverted && (i = n, n = this.xAxis), {
                translateX: i ? i.left : t.plotLeft,
                translateY: n ? n.top : t.plotTop,
                scaleX: 1,
                scaleY: 1
            }
        },
        render: function() {
            var i = this,
                r = i.chart,
                u, e = i.options,
                f = (u = e.animation) && !!i.animate && r.renderer.isSVG && n(u.duration, 500) || 0,
                o = i.visible ? "visible" : "hidden",
                s = e.zIndex,
                h = i.hasRendered,
                c = r.seriesGroup;
            u = i.plotGroup("group", "series", o, s, c);
            i.markerGroup = i.plotGroup("markerGroup", "markers", o, s, c);
            f && i.animate(!0);
            i.getAttribs();
            u.inverted = i.isCartesian ? r.inverted : !1;
            i.drawGraph && (i.drawGraph(), i.clipNeg());
            t(i.points, function(n) {
                n.redraw && n.redraw()
            });
            i.drawDataLabels && i.drawDataLabels();
            i.visible && i.drawPoints();
            i.drawTracker && i.options.enableMouseTracking !== !1 && i.drawTracker();
            r.inverted && i.invertGroups();
            e.clip === !1 || i.sharedClipKey || h || u.clip(r.clipRect);
            f && i.animate();
            h || (f ? i.animationTimeout = setTimeout(function() {
                i.afterAnimate()
            }, f) : i.afterAnimate());
            i.isDirty = i.isDirtyData = !1;
            i.hasRendered = !0
        },
        redraw: function() {
            var t = this.chart,
                f = this.isDirtyData,
                i = this.group,
                r = this.xAxis,
                u = this.yAxis;
            i && (t.inverted && i.attr({
                width: t.plotWidth,
                height: t.plotHeight
            }), i.animate({
                translateX: n(r && r.left, t.plotLeft),
                translateY: n(u && u.top, t.plotTop)
            }));
            this.translate();
            this.setTooltipPoints && this.setTooltipPoints(!0);
            this.render();
            f && y(this, "updatedData")
        }
    };
    of.prototype = {
        destroy: function() {
            lr(this, this.axis)
        },
        render: function(n) {
            var t = this.options,
                i = t.format,
                i = i ? ur(i, this) : t.formatter.call(this);
            this.label ? this.label.attr({
                text: i,
                visibility: "hidden"
            }) : this.label = this.axis.chart.renderer.text(i, null, null, t.useHTML).css(t.style).attr({
                align: this.textAlign,
                rotation: t.rotation,
                visibility: "hidden"
            }).add(n)
        },
        setOffset: function(n, t) {
            var i = this.axis,
                e = i.chart,
                r = e.inverted,
                u = this.isNegative,
                f = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                i = i.translate(0),
                i = p(f - i),
                s = e.xAxis[0].translate(this.x) + n,
                o = e.plotHeight,
                u = {
                    x: r ? u ? f : f - i : s,
                    y: r ? o - s - t : u ? o - f - i : o - f,
                    width: r ? i : t,
                    height: r ? t : i
                };
            (r = this.label) && (r.align(this.alignOptions, null, u), u = r.alignAttr, r[this.options.crop === !1 || e.isInsidePlot(u.x, u.y) ? "show" : "hide"](!0))
        }
    };
    ui.prototype.buildStacks = function() {
        var i = this.series,
            r = n(this.options.reversedStacks, !0),
            t = i.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1; t--;) i[r ? t : i.length - t - 1].setStackedPoints();
            if (this.usePercentage)
                for (t = 0; t < i.length; t++) i[t].setPercentStacks()
        }
    };
    ui.prototype.renderStackTotals = function() {
        var n = this.chart,
            f = n.renderer,
            i = this.stacks,
            r, u, t = this.stackTotalGroup;
        t || (this.stackTotalGroup = t = f.g("stack-labels").attr({
            visibility: "visible",
            zIndex: 6
        }).add());
        t.translate(n.plotLeft, n.plotTop);
        for (r in i)
            for (u in n = i[r], n) n[u].render(t)
    };
    v.prototype.setStackedPoints = function() {
        if (this.options.stacking && !(this.visible !== !0 && this.chart.options.chart.ignoreHiddenSeries !== !1)) {
            for (var b = this.processedXData, a = this.processedYData, v = [], k = a.length, s = this.options, d = s.threshold, g = s.stack, s = s.stacking, h = this.stackKey, y = "-" + h, w = this.negStacks, e = this.yAxis, i = e.stacks, c = e.oldStacks, u, n, l, t, o, f = 0; f < k; f++) t = b[f], o = a[f], l = this.index + "," + f, n = (u = w && o < d) ? y : h, i[n] || (i[n] = {}), i[n][t] || (c[n] && c[n][t] ? (i[n][t] = c[n][t], i[n][t].total = null) : i[n][t] = new of(e, e.options.stackLabels, u, t, g)), n = i[n][t], n.points[l] = [n.cum || 0], s === "percent" ? (u = u ? h : y, w && i[u] && i[u][t] ? (u = i[u][t], n.total = u.total = r(u.total, n.total) + p(o) || 0) : n.total = pt(n.total + (p(o) || 0))) : n.total = pt(n.total + (o || 0)), n.cum = (n.cum || 0) + (o || 0), n.points[l].push(n.cum), v[f] = n.cum;
            s === "percent" && (e.usePercentage = !0);
            this.stackedYData = v;
            e.oldStacks = {}
        }
    };
    v.prototype.setPercentStacks = function() {
        var n = this,
            i = n.stackKey,
            r = n.yAxis.stacks,
            u = n.processedXData;
        t([i, "-" + i], function(t) {
            for (var o, e = u.length, i, f; e--;)(i = u[e], o = (f = r[t] && r[t][i]) && f.points[n.index + "," + e], i = o) && (f = f.total ? 100 / f.total : 0, i[0] = pt(i[0] * f), i[1] = pt(i[1] * f), n.stackedYData[e] = i[1])
        })
    };
    f(kr.prototype, {
        addSeries: function(t, i, r) {
            var f, u = this;
            return t && (i = n(i, !0), y(u, "addSeries", {
                options: t
            }, function() {
                f = u.initSeries(t);
                u.isDirtyLegend = !0;
                u.linkSeries();
                i && u.redraw(r)
            })), f
        },
        addAxis: function(t, i, r, u) {
            var f = i ? "xAxis" : "yAxis",
                e = this.options;
            new ui(this, o(t, {
                index: this[f].length,
                isX: i
            }));
            e[f] = si(e[f] || {});
            e[f].push(t);
            n(r, !0) && this.redraw(u)
        },
        showLoading: function(n) {
            var t = this,
                u = t.options,
                i = t.loadingDiv,
                r = u.loading,
                e = function() {
                    i && a(i, {
                        left: t.plotLeft + "px",
                        top: t.plotTop + "px",
                        width: t.plotWidth + "px",
                        height: t.plotHeight + "px"
                    })
                };
            i || (t.loadingDiv = i = ct(er, {
                className: "highcharts-loading"
            }, f(r.style, {
                zIndex: 10,
                display: ut
            }), t.container), t.loadingSpan = ct("span", null, r.labelStyle, i), b(t, "redraw", e));
            t.loadingSpan.innerHTML = n || u.lang.loading;
            t.loadingShown || (a(i, {
                opacity: 0,
                display: ""
            }), lu(i, {
                opacity: r.style.opacity
            }, {
                duration: r.showDuration || 0
            }), t.loadingShown = !0);
            e()
        },
        hideLoading: function() {
            var t = this.options,
                n = this.loadingDiv;
            n && lu(n, {
                opacity: 0
            }, {
                duration: t.loading.hideDuration || 100,
                complete: function() {
                    a(n, {
                        display: ut
                    })
                }
            });
            this.loadingShown = !1
        }
    });
    f(pi.prototype, {
        update: function(t, i, r, u) {
            function c() {
                f.applyOptions(t);
                yt(t) && !ir(t) && (f.redraw = function() {
                    o && (t && t.marker && t.marker.symbol ? f.graphic = o.destroy() : o.attr(f.pointAttr[f.state || ""]));
                    t && t.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy());
                    f.redraw = null
                });
                s = f.index;
                e.updateParallelArrays(f, s);
                l.data[s] = f.options;
                e.isDirty = e.isDirtyData = !0;
                !e.fixedBox && e.hasCartesianSeries && (h.isDirtyBox = !0);
                l.legendType === "point" && h.legend.destroyItem(f);
                i && h.redraw(r)
            }
            var f = this,
                e = f.series,
                o = f.graphic,
                s, h = e.chart,
                l = e.options,
                i = n(i, !0);
            u === !1 ? c() : f.firePointEvent("update", {
                options: t
            }, c)
        },
        remove: function(t, i) {
            var u = this,
                r = u.series,
                o = r.points,
                s = r.chart,
                f, e = r.data;
            vr(i, s);
            t = n(t, !0);
            u.firePointEvent("remove", null, function() {
                f = or(u, e);
                e.length === o.length && o.splice(f, 1);
                e.splice(f, 1);
                r.options.data.splice(f, 1);
                r.updateParallelArrays(u, "splice", f, 1);
                u.destroy();
                r.isDirty = !0;
                r.isDirtyData = !0;
                t && s.redraw()
            })
        }
    });
    f(v.prototype, {
        addPoint: function(i, r, u, f) {
            var c = this.options,
                s = this.data,
                o = this.graph,
                e = this.area,
                l = this.chart,
                a = this.xAxis && this.xAxis.names,
                p = o && o.shift || 0,
                v = c.data,
                y, h = this.xData;
            if (vr(f, l), u && t([o, e, this.graphNeg, this.areaNeg], function(n) {
                    n && (n.shift = p + 1)
                }), e && (e.isArea = !0), r = n(r, !0), f = {
                    series: this
                }, this.pointClass.prototype.applyOptions.apply(f, [i]), o = f.x, e = h.length, this.requireSorting && o < h[e - 1])
                for (y = !0; e && h[e - 1] > o;) e--;
            this.updateParallelArrays(f, "splice", e, 0, 0);
            this.updateParallelArrays(f, e);
            a && f.name && (a[o] = f.name);
            v.splice(e, 0, i);
            y && (this.data.splice(e, 0, null), this.processData());
            c.legendType === "point" && this.generatePoints();
            u && (s[0] && s[0].remove ? s[0].remove(!1) : (s.shift(), this.updateParallelArrays(f, "shift"), v.shift()));
            this.isDirtyData = this.isDirty = !0;
            r && (this.getAttribs(), l.redraw())
        },
        remove: function(t, i) {
            var r = this,
                u = r.chart,
                t = n(t, !0);
            r.isRemoving || (r.isRemoving = !0, y(r, "remove", null, function() {
                r.destroy();
                u.isDirtyLegend = u.isDirtyBox = !0;
                u.linkSeries();
                t && u.redraw(i)
            }));
            r.isRemoving = !1
        },
        update: function(i, r) {
            var s = this,
                h = this.chart,
                v = this.userOptions,
                l = this.type,
                a = w[l].prototype,
                e = ["group", "markerGroup", "dataLabelsGroup"],
                c;
            t(e, function(n) {
                e[n] = s[n];
                delete s[n]
            });
            i = o(v, {
                animation: !1,
                index: this.index,
                pointStart: this.xData[0]
            }, {
                data: this.options.data
            }, i);
            this.remove(!1);
            for (c in a) a.hasOwnProperty(c) && (this[c] = u);
            f(this, w[i.type || l].prototype);
            t(e, function(n) {
                s[n] = e[n]
            });
            this.init(h, i);
            h.linkSeries();
            n(r, !0) && h.redraw(!1)
        }
    });
    f(ui.prototype, {
        update: function(t, i) {
            var r = this.chart,
                t = r.options[this.coll][this.options.index] = o(this.userOptions, t);
            this.destroy(!0);
            this._addedPlotLB = u;
            this.init(r, f(t, {
                events: u
            }));
            r.isDirtyBox = !0;
            n(i, !0) && r.redraw()
        },
        remove: function(i) {
            for (var r = this.chart, u = this.coll, f = this.series, e = f.length; e--;) f[e] && f[e].remove(!1);
            ii(r.axes, this);
            ii(r[u], this);
            r.options[u].splice(this.options.index, 1);
            t(r[u], function(n, t) {
                n.options.index = t
            });
            this.destroy();
            r.isDirtyBox = !0;
            n(i, !0) && r.redraw()
        },
        setTitle: function(n, t) {
            this.update({
                title: n
            }, t)
        },
        setCategories: function(n, t) {
            this.update({
                categories: n
            }, t)
        }
    });
    kt = ri(v);
    w.line = kt;
    at.area = o(rt, {
        threshold: 0
    });
    gt = ri(v, {
        type: "area",
        getSegments: function() {
            var a = this,
                u = [],
                r = [],
                f = [],
                y = this.xAxis,
                e = this.yAxis,
                o = e.stacks[this.stackKey],
                i = {},
                s, h, c = this.points,
                p = this.options.connectNulls,
                n, l;
            if (this.options.stacking && !this.cropped) {
                for (n = 0; n < c.length; n++) i[c[n].x] = c[n];
                for (l in o) o[l].total !== null && f.push(+l);
                f.sort(function(n, t) {
                    return n - t
                });
                t(f, function(t) {
                    var u = 0,
                        f;
                    if (!p || i[t] && i[t].y !== null)
                        if (i[t]) r.push(i[t]);
                        else {
                            for (n = a.index; n <= e.series.length; n++)
                                if (f = o[t].points[n + "," + t]) {
                                    u = f[1];
                                    break
                                }
                            s = y.translate(t);
                            h = e.toPixels(u, !0);
                            r.push({
                                y: null,
                                plotX: s,
                                clientX: s,
                                plotY: h,
                                yBottom: h,
                                onMouseOver: hi
                            })
                        }
                });
                r.length && u.push(r)
            } else v.prototype.getSegments.call(this), u = this.segments;
            this.segments = u
        },
        getSegmentPath: function(t) {
            var r = v.prototype.getSegmentPath.call(this, t),
                u = [].concat(r),
                i, f = this.options,
                e, o;
            if (i = r.length, e = this.yAxis.getThreshold(f.threshold), i === 3 && u.push("L", r[1], r[2]), f.stacking && !this.closedStacks)
                for (i = t.length - 1; i >= 0; i--) o = n(t[i].yBottom, e), i < t.length - 1 && f.step && u.push(t[i + 1].plotX, o), u.push(t[i].plotX, o);
            else this.closeSegment(u, t, e);
            return this.areaPath = this.areaPath.concat(u), r
        },
        closeSegment: function(n, t, i) {
            n.push("L", t[t.length - 1].plotX, i, "L", t[0].plotX, i)
        },
        drawGraph: function() {
            this.areaPath = [];
            v.prototype.drawGraph.apply(this);
            var i = this,
                u = this.areaPath,
                r = this.options,
                f = r.negativeColor,
                e = r.negativeFillColor,
                o = [
                    ["area", this.color, r.fillColor]
                ];
            (f || e) && o.push(["areaNeg", f, e]);
            t(o, function(t) {
                var f = t[0],
                    e = i[f];
                e ? e.animate({
                    d: u
                }) : i[f] = i.chart.renderer.path(u).attr({
                    fill: n(t[2], yi(t[1]).setOpacity(n(r.fillOpacity, .75)).get()),
                    zIndex: 0
                }).add(i.group)
            })
        },
        drawLegendSymbol: d.drawRectangle
    });
    w.area = gt;
    at.spline = o(rt);
    kt = ri(v, {
        type: "spline",
        getPointSpline: function(n, t, i) {
            var h = t.plotX,
                u = t.plotY,
                o = n[i - 1],
                s = n[i + 1],
                a, e, c, f, v;
            return o && s && (n = o.plotY, c = s.plotX, s = s.plotY, a = (1.5 * h + o.plotX) / 2.5, e = (1.5 * u + n) / 2.5, c = (1.5 * h + c) / 2.5, f = (1.5 * u + s) / 2.5, v = (f - e) * (c - h) / (c - a) + u - f, e += v, f += v, e > n && e > u ? (e = r(n, u), f = 2 * u - e) : e < n && e < u && (e = l(n, u), f = 2 * u - e), f > s && f > u ? (f = r(s, u), e = 2 * u - f) : f < s && f < u && (f = l(s, u), e = 2 * u - f), t.rightContX = c, t.rightContY = f), i ? (t = ["C", o.rightContX || o.plotX, o.rightContY || o.plotY, a || h, e || u, h, u], o.rightContX = o.rightContY = null) : t = ["M", h, u], t
        }
    });
    w.spline = kt;
    at.areaspline = o(at.area);
    gt = gt.prototype;
    kt = ri(kt, {
        type: "areaspline",
        closedStacks: !0,
        getSegmentPath: gt.getSegmentPath,
        closeSegment: gt.closeSegment,
        drawGraph: gt.drawGraph,
        drawLegendSymbol: d.drawRectangle
    });
    w.areaspline = kt;
    at.column = o(rt, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: .2,
        marker: null,
        pointPadding: .1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {
                brightness: .1,
                shadow: !1,
                halo: !1
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: !1
            }
        },
        dataLabels: {
            align: null,
            verticalAlign: null,
            y: null
        },
        stickyTracking: !1,
        tooltip: {
            distance: 6
        },
        threshold: 0
    });
    kt = ri(v, {
        type: "column",
        pointAttrToOptions: {
            stroke: "borderColor",
            fill: "color",
            r: "borderRadius"
        },
        cropShoulder: 0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function() {
            v.prototype.init.apply(this, arguments);
            var n = this,
                i = n.chart;
            i.hasRendered && t(i.series, function(t) {
                t.type === n.type && (t.isDirty = !0)
            })
        },
        getColumnMetrics: function() {
            var f = this,
                e = f.options,
                r = f.xAxis,
                y = f.yAxis,
                w = r.reversed,
                s, a = {},
                v, o = 0;
            e.grouping === !1 ? o = 1 : t(f.chart.series, function(n) {
                var t = n.options,
                    i = n.yAxis;
                n.type === f.type && n.visible && y.len === i.len && y.pos === i.pos && (t.stacking ? (s = n.stackKey, a[s] === u && (a[s] = o++), v = a[s]) : t.grouping !== !1 && (v = o++), n.columnIndex = v)
            });
            var r = l(p(r.transA) * (r.ordinalSlope || e.pointRange || r.closestPointRange || r.tickInterval || 1), r.len),
                b = r * e.groupPadding,
                h = (r - 2 * b) / o,
                c = e.pointWidth,
                e = i(c) ? (h - c) / 2 : h * e.pointPadding,
                c = n(c, h - 2 * e);
            return f.columnMetrics = {
                width: c,
                offset: e + (b + ((w ? o - (f.columnIndex || 0) : f.columnIndex) || 0) * h - r / 2) * (w ? -1 : 1)
            }
        },
        translate: function() {
            var i = this,
                o = i.chart,
                s = i.options,
                c = i.borderWidth = n(s.borderWidth, i.activePointCount > .5 * i.xAxis.len ? 0 : 1),
                f = i.yAxis,
                h = i.translatedThreshold = f.getThreshold(s.threshold),
                u = n(s.minPointLength, 5),
                w = i.getColumnMetrics(),
                b = w.width,
                a = i.barW = r(b, 1 + 2 * c),
                d = i.pointXOffset = w.offset,
                k = -(c % 2 ? .5 : 0),
                y = c % 2 ? .5 : 1;
            o.renderer.isVML && o.inverted && (y += 1);
            s.pointPadding && (a = fr(a));
            v.prototype.translate.apply(i);
            t(i.points, function(t) {
                var w = n(t.yBottom, h),
                    nt = l(r(-999 - w, t.plotY), f.len + 999 + w),
                    c = t.plotX + d,
                    g = a,
                    s = l(nt, w),
                    v;
                v = r(nt, w) - s;
                p(v) < u && u && (v = u, s = e(p(s - h) > u ? w - u : h - (f.translate(t.y, 0, 1, 0, 1) <= h ? u : 0)));
                t.barX = c;
                t.pointWidth = b;
                t.tooltipPos = o.inverted ? [f.len - nt, i.xAxis.len - c - g / 2] : [c + g / 2, nt + f.pos - o.plotTop];
                g = e(c + g) + k;
                c = e(c) + k;
                g -= c;
                w = p(s) < .5;
                v = e(s + v) + y;
                s = e(s) + y;
                v -= s;
                w && (s -= 1, v += 1);
                t.shapeType = "rect";
                t.shapeArgs = {
                    x: c,
                    y: s,
                    width: g,
                    height: v
                }
            })
        },
        getSymbol: hi,
        drawLegendSymbol: d.drawRectangle,
        drawGraph: hi,
        drawPoints: function() {
            var n = this,
                e = this.chart,
                r = n.options,
                h = e.renderer,
                c = r.animationLimit || 250,
                f, s;
            t(n.points, function(t) {
                var l = t.plotY,
                    a = t.graphic;
                l === u || isNaN(l) || t.y === null ? a && (t.graphic = a.destroy()) : (f = t.shapeArgs, l = i(n.borderWidth) ? {
                    "stroke-width": n.borderWidth
                } : {}, s = t.pointAttr[t.selected ? "select" : ""] || n.pointAttr[""], a ? (iu(a), a.attr(l)[e.pointCount < c ? "animate" : "attr"](o(f))) : t.graphic = h[t.shapeType](f).attr(s).attr(l).add(n.group).shadow(r.shadow, null, r.stacking && !r.borderRadius))
            })
        },
        animate: function(n) {
            var i = this.yAxis,
                f = this.options,
                u = this.chart.inverted,
                t = {};
            vt && (n ? (t.scaleY = .001, n = l(i.pos + i.len, r(i.pos, i.toPixels(f.threshold))), u ? t.translateX = n - i.len : t.translateY = n, this.group.attr(t)) : (t.scaleY = 1, t[u ? "translateX" : "translateY"] = i.pos, this.group.animate(t, this.options.animation), this.animate = null))
        },
        remove: function() {
            var n = this,
                i = n.chart;
            i.hasRendered && t(i.series, function(t) {
                t.type === n.type && (t.isDirty = !0)
            });
            v.prototype.remove.apply(n, arguments)
        }
    });
    w.column = kt;
    at.bar = o(at.column);
    gt = ri(kt, {
        type: "bar",
        inverted: !0
    });
    w.bar = gt;
    at.scatter = o(rt, {
        lineWidth: 0,
        tooltip: {
            headerFormat: '<span style="color:{series.color}">â—<\/span> <span style="font-size: 10px;"> {series.name}<\/span><br/>',
            pointFormat: "x: <b>{point.x}<\/b><br/>y: <b>{point.y}<\/b><br/>"
        },
        stickyTracking: !1
    });
    gt = ri(v, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
        singularTooltips: !0,
        drawGraph: function() {
            this.options.lineWidth && v.prototype.drawGraph.call(this)
        }
    });
    w.scatter = gt;
    at.pie = o(rt, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
            distance: 30,
            enabled: !0,
            formatter: function() {
                return this.point.name
            }
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        states: {
            hover: {
                brightness: .1,
                shadow: !1
            }
        },
        stickyTracking: !1,
        tooltip: {
            followPointer: !0
        }
    });
    rt = {
        type: "pie",
        isCartesian: !1,
        pointClass: ri(pi, {
            init: function() {
                pi.prototype.init.apply(this, arguments);
                var t = this,
                    i;
                return t.y < 0 && (t.y = null), f(t, {
                    visible: t.visible !== !1,
                    name: n(t.name, "Slice")
                }), i = function(n) {
                    t.slice(n.type === "select")
                }, b(t, "select", i), b(t, "unselect", i), t
            },
            setVisible: function(n) {
                var i = this,
                    r = i.series,
                    f = r.chart;
                i.visible = i.options.visible = n = n === u ? !i.visible : n;
                r.options.data[or(i, r.data)] = i.options;
                t(["graphic", "dataLabel", "connector", "shadowGroup"], function(t) {
                    i[t] && i[t][n ? "show" : "hide"](!0)
                });
                i.legendItem && f.legend.colorizeItem(i, n);
                !r.isDirty && r.options.ignoreHiddenPoint && (r.isDirty = !0, f.redraw())
            },
            slice: function(t, r, u) {
                var f = this.series;
                vr(u, f.chart);
                n(r, !0);
                this.sliced = this.options.sliced = t = i(t) ? t : !this.sliced;
                f.options.data[or(this, f.data)] = this.options;
                t = t ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                };
                this.graphic.animate(t);
                this.shadowGroup && this.shadowGroup.animate(t)
            },
            haloPath: function(n) {
                var t = this.shapeArgs,
                    i = this.series.chart;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(i.plotLeft + t.x, i.plotTop + t.y, t.r + n, t.r + n, {
                    innerR: this.shapeArgs.r,
                    start: t.start,
                    end: t.end
                })
            }
        }),
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        axisTypes: [],
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color"
        },
        singularTooltips: !0,
        getColor: hi,
        animate: function(n) {
            var i = this,
                u = i.points,
                r = i.startAngleRad;
            n || (t(u, function(n) {
                var t = n.graphic,
                    n = n.shapeArgs;
                t && (t.attr({
                    r: i.center[3] / 2,
                    start: r,
                    end: r
                }), t.animate({
                    r: n.r,
                    start: n.start,
                    end: n.end
                }, i.options.animation))
            }), i.animate = null)
        },
        setData: function(t, i, r, u) {
            v.prototype.setData.call(this, t, !1, r, u);
            this.processData();
            this.generatePoints();
            n(i, !0) && this.chart.redraw(r)
        },
        generatePoints: function() {
            var n, i = 0,
                r, u, t, f = this.options.ignoreHiddenPoint;
            for (v.prototype.generatePoints.call(this), r = this.points, u = r.length, n = 0; n < u; n++) t = r[n], i += f && !t.visible ? 0 : t.y;
            for (this.total = i, n = 0; n < u; n++) t = r[n], t.percentage = i > 0 ? t.y / i * 100 : 0, t.total = i
        },
        translate: function(t) {
            this.generatePoints();
            var v = 0,
                o = this.options,
                y = o.slicedOffset,
                h = y + o.borderWidth,
                u, f, i, c = o.startAngle || 0,
                p = this.startAngleRad = fi / 180 * (c - 90),
                c = (this.endAngleRad = fi / 180 * (n(o.endAngle, c + 360) - 90)) - p,
                w = this.points,
                s = o.dataLabels.distance,
                o = o.ignoreHiddenPoint,
                a, b = w.length,
                r;
            for (t || (this.center = t = this.getCenter()), this.getX = function(n, r) {
                    return i = et.asin(l((n - t[1]) / (t[2] / 2 + s), 1)), t[0] + (r ? -1 : 1) * lt(i) * (t[2] / 2 + s)
                }, a = 0; a < b; a++) r = w[a], u = p + v * c, (!o || r.visible) && (v += r.percentage / 100), f = p + v * c, r.shapeType = "arc", r.shapeArgs = {
                x: t[0],
                y: t[1],
                r: t[2] / 2,
                innerR: t[3] / 2,
                start: e(u * 1e3) / 1e3,
                end: e(f * 1e3) / 1e3
            }, i = (f + u) / 2, i > 1.5 * fi ? i -= 2 * fi : i < -fi / 2 && (i += 2 * fi), r.slicedTranslation = {
                translateX: e(lt(i) * y),
                translateY: e(wt(i) * y)
            }, u = lt(i) * t[2] / 2, f = wt(i) * t[2] / 2, r.tooltipPos = [t[0] + u * .7, t[1] + f * .7], r.half = i < -fi / 2 || i > fi / 2 ? 1 : 0, r.angle = i, h = l(h, s / 2), r.labelPos = [t[0] + u + lt(i) * s, t[1] + f + wt(i) * s, t[0] + u + lt(i) * h, t[1] + f + wt(i) * h, t[0] + u, t[1] + f, s < 0 ? "center" : r.half ? "right" : "left", i]
        },
        drawGraph: null,
        drawPoints: function() {
            var n = this,
                e = n.chart.renderer,
                r, u, o = n.options.shadow,
                i, s;
            o && !n.shadowGroup && (n.shadowGroup = e.g("shadow").add(n.group));
            t(n.points, function(t) {
                u = t.graphic;
                s = t.shapeArgs;
                i = t.shadowGroup;
                o && !i && (i = t.shadowGroup = e.g("shadow").add(n.shadowGroup));
                r = t.sliced ? t.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                };
                i && i.attr(r);
                u ? u.animate(f(s, r)) : t.graphic = u = e[t.shapeType](s).setRadialReference(n.center).attr(t.pointAttr[t.selected ? "select" : ""]).attr({
                    "stroke-linejoin": "round"
                }).attr(r).add(n.group).shadow(o, i);
                t.visible !== void 0 && t.setVisible(t.visible)
            })
        },
        sortByAngle: function(n, t) {
            n.sort(function(n, i) {
                return n.angle !== void 0 && (i.angle - n.angle) * t
            })
        },
        drawLegendSymbol: d.drawRectangle,
        getCenter: ht.getCenter,
        getSymbol: hi
    };
    rt = ri(v, rt);
    w.pie = rt;
    v.prototype.drawDataLabels = function() {
        var e = this,
            l = e.options,
            v = l.cursor,
            r = l.dataLabels,
            p = e.points,
            c, a, y = e.hasRendered || 0,
            s, h;
        (r.enabled || e._hasPointLabels) && (e.dlProcessOptions && e.dlProcessOptions(r), h = e.plotGroup("dataLabelsGroup", "data-labels", r.defer ? "hidden" : "visible", r.zIndex || 6), n(r.defer, !0) && (h.attr({
            opacity: +y
        }), y || b(e, "afterAnimate", function() {
            e.visible && h.show();
            h[l.animation ? "animate" : "attr"]({
                opacity: 1
            }, {
                duration: 200
            })
        })), a = r, t(p, function(t) {
            var y, l = t.dataLabel,
                p, w, b = t.connector,
                k = !0;
            if (c = t.options && t.options.dataLabels, y = n(c && c.enabled, a.enabled), l && !y) t.dataLabel = l.destroy();
            else if (y) {
                if (r = o(a, c), y = r.rotation, p = t.getLabelConfig(), s = r.format ? ur(r.format, p) : r.formatter.call(p, r), r.style.color = n(r.color, r.style.color, e.color, "black"), l) i(s) ? (l.attr({
                    text: s
                }), k = !1) : (t.dataLabel = l = l.destroy(), b) && (t.connector = b.destroy());
                else if (i(s)) {
                    l = {
                        fill: r.backgroundColor,
                        stroke: r.borderColor,
                        "stroke-width": r.borderWidth,
                        r: r.borderRadius || 0,
                        rotation: y,
                        padding: r.padding,
                        zIndex: 1
                    };
                    for (w in l) l[w] === u && delete l[w];
                    l = t.dataLabel = e.chart.renderer[y ? "text" : "label"](s, 0, -999, null, null, null, r.useHTML).attr(l).css(f(r.style, v && {
                        cursor: v
                    })).add(h).shadow(r.shadow)
                }
                l && e.alignDataLabel(t, l, r, null, k)
            }
        }))
    };
    v.prototype.alignDataLabel = function(t, i, r, u, o) {
        var h = this.chart,
            s = h.inverted,
            l = n(t.plotX, -999),
            a = n(t.plotY, -999),
            c = i.getBBox();
        (t = this.visible && (t.series.forceDL || h.isInsidePlot(l, e(a), s) || u && h.isInsidePlot(l, s ? u.x + 1 : u.y + u.height - 1, s))) && (u = f({
            x: s ? h.plotWidth - a : l,
            y: e(s ? h.plotHeight - l : a),
            width: 0,
            height: 0
        }, u), f(r, {
            width: c.width,
            height: c.height
        }), r.rotation ? i[o ? "attr" : "animate"]({
            x: u.x + r.x + u.width / 2,
            y: u.y + r.y + u.height / 2
        }).attr({
            align: r.align
        }) : (i.align(r, null, u), s = i.alignAttr, n(r.overflow, "justify") === "justify" ? this.justifyDataLabel(i, r, s, c, u, o) : n(r.crop, !0) && (t = h.isInsidePlot(s.x, s.y) && h.isInsidePlot(s.x + c.width, s.y + c.height))));
        t || (i.attr({
            y: -999
        }), i.placed = !1)
    };
    v.prototype.justifyDataLabel = function(n, t, i, r, u, f) {
        var s = this.chart,
            h = t.align,
            c = t.verticalAlign,
            e, o;
        e = i.x;
        e < 0 && (h === "right" ? t.align = "left" : t.x = -e, o = !0);
        e = i.x + r.width;
        e > s.plotWidth && (h === "left" ? t.align = "right" : t.x = s.plotWidth - e, o = !0);
        e = i.y;
        e < 0 && (c === "bottom" ? t.verticalAlign = "top" : t.y = -e, o = !0);
        e = i.y + r.height;
        e > s.plotHeight && (c === "top" ? t.verticalAlign = "bottom" : t.y = s.plotHeight - e, o = !0);
        o && (n.placed = !f, n.align(t, null, u))
    };
    w.pie && (w.pie.prototype.drawDataLabels = function() {
        var a = this,
            d = a.data,
            f, st = a.chart,
            g = a.options.dataLabels,
            rt = n(g.connectorPadding, 10),
            yt = n(g.connectorWidth, 1),
            pt = st.plotWidth,
            wt = st.plotHeight,
            it, ct, dt = n(g.softConnector, !0),
            tt = g.distance,
            lt = a.center,
            ft = lt[2] / 2,
            ht = lt[1],
            gt = tt > 0,
            y, s, u, bt = [
                [],
                []
            ],
            w, o, et, ut, i, b = [0, 0, 0, 0],
            kt = function(n, t) {
                return t.y - n.y
            },
            vt, ot;
        if (a.visible && (g.enabled || a._hasPointLabels)) {
            for (v.prototype.drawDataLabels.apply(a), t(d, function(n) {
                    n.dataLabel && n.visible && bt[n.half].push(n)
                }), ut = 2; ut--;) {
                var k = [],
                    at = [],
                    c = bt[ut],
                    nt = c.length,
                    h;
                if (nt) {
                    for (a.sortByAngle(c, ut - .5), i = d = 0; !d && c[i];) d = c[i] && c[i].dataLabel && (c[i].dataLabel.getBBox().height || 21), i++;
                    if (tt > 0) {
                        for (s = l(ht + ft + tt, st.plotHeight), i = r(0, ht - ft - tt); i <= s; i += d) k.push(i);
                        if (s = k.length, nt > s) {
                            for (f = [].concat(c), f.sort(kt), i = nt; i--;) f[i].rank = i;
                            for (i = nt; i--;) c[i].rank >= s && c.splice(i, 1);
                            nt = c.length
                        }
                        for (i = 0; i < nt; i++) {
                            for (f = c[i], u = f.labelPos, f = 9999, ot = 0; ot < s; ot++) vt = p(k[ot] - u[1]), vt < f && (f = vt, h = ot);
                            if (h < i && k[i] !== null) h = i;
                            else
                                for (s < nt - i + h && k[i] !== null && (h = s - nt + i); k[h] === null;) h++;
                            at.push({
                                i: h,
                                y: k[h]
                            });
                            k[h] = null
                        }
                        at.sort(kt)
                    }
                    for (i = 0; i < nt; i++) f = c[i], u = f.labelPos, y = f.dataLabel, et = f.visible === !1 ? "hidden" : "visible", f = u[1], tt > 0 ? (s = at.pop(), h = s.i, o = s.y, f > o && k[h + 1] !== null || f < o && k[h - 1] !== null) && (o = l(r(0, f), st.plotHeight)) : o = f, w = g.justify ? lt[0] + (ut ? -1 : 1) * (ft + tt) : a.getX(o === ht - ft - tt || o === ht + ft + tt ? f : o, ut), y._attr = {
                        visibility: et,
                        align: u[6]
                    }, y._pos = {
                        x: w + g.x + ({
                            left: rt,
                            right: -rt
                        }[u[6]] || 0),
                        y: o + g.y - 10
                    }, y.connX = w, y.connY = o, this.options.size === null && (s = y.width, w - s < rt ? b[3] = r(e(s - w + rt), b[3]) : w + s > pt - rt && (b[1] = r(e(w + s - pt + rt), b[1])), o - d / 2 < 0 ? b[0] = r(e(-o + d / 2), b[0]) : o + d / 2 > wt && (b[2] = r(e(o + d / 2 - wt), b[2])))
                }
            }(ki(b) === 0 || this.verifyDataLabelOverflow(b)) && (this.placeDataLabels(), gt && yt && t(this.points, function(n) {
                it = n.connector;
                u = n.labelPos;
                (y = n.dataLabel) && y._pos ? (et = y._attr.visibility, w = y.connX, o = y.connY, ct = dt ? ["M", w + (u[6] === "left" ? 5 : -5), o, "C", w, o, 2 * u[2] - u[4], 2 * u[3] - u[5], u[2], u[3], "L", u[4], u[5]] : ["M", w + (u[6] === "left" ? 5 : -5), o, "L", u[2], u[3], "L", u[4], u[5]], it ? (it.animate({
                    d: ct
                }), it.attr("visibility", et)) : n.connector = it = a.chart.renderer.path(ct).attr({
                    "stroke-width": yt,
                    stroke: g.connectorColor || n.color || "#606060",
                    visibility: et
                }).add(a.dataLabelsGroup)) : it && (n.connector = it.destroy())
            }))
        }
    }, w.pie.prototype.placeDataLabels = function() {
        t(this.points, function(n) {
            var n = n.dataLabel,
                t;
            n && ((t = n._pos) ? (n.attr(n._attr), n[n.moved ? "animate" : "attr"](t), n.moved = !0) : n && n.attr({
                y: -999
            }))
        })
    }, w.pie.prototype.alignDataLabel = hi, w.pie.prototype.verifyDataLabelOverflow = function(n) {
        var i = this.center,
            f = this.options,
            e = f.center,
            u = f = f.minSize || 80,
            o;
        return e[0] !== null ? u = r(i[2] - r(n[1], n[3]), f) : (u = r(i[2] - n[1] - n[3], f), i[0] += (n[3] - n[1]) / 2), e[1] !== null ? u = r(l(u, i[2] - r(n[0], n[2])), f) : (u = r(l(u, i[2] - n[0] - n[2]), f), i[1] += (n[0] - n[2]) / 2), u < i[2] ? (i[2] = u, this.translate(i), t(this.points, function(n) {
            n.dataLabel && (n.dataLabel._pos = null)
        }), this.drawDataLabels && this.drawDataLabels()) : o = !0, o
    });
    w.column && (w.column.prototype.alignDataLabel = function(t, i, r, u, f) {
        var e = this.chart,
            s = e.inverted,
            l = t.dlBox || t.shapeArgs,
            h = t.below || t.plotY > n(this.translatedThreshold, e.plotSizeY),
            c = n(r.inside, !!this.options.stacking);
        l && (u = o(l), s && (u = {
            x: e.plotWidth - u.y - u.height,
            y: e.plotHeight - u.x - u.width,
            width: u.height,
            height: u.width
        }), !c) && (s ? (u.x += h ? 0 : u.width, u.width = 0) : (u.y += h ? u.height : 0, u.height = 0));
        r.align = n(r.align, !s || c ? "center" : h ? "right" : "left");
        r.verticalAlign = n(r.verticalAlign, s || c ? "middle" : h ? "top" : "bottom");
        v.prototype.alignDataLabel.call(this, t, i, r, u, f)
    });
    rt = tt.TrackerMixin = {
        drawTrackerPoint: function() {
            var n = this,
                i = n.chart,
                e = i.pointer,
                r = n.options.cursor,
                o = r && {
                    cursor: r
                },
                f = function(t) {
                    var f = t.target,
                        r;
                    for (i.hoverSeries !== n && n.onMouseOver(); f && !r;) r = f.point, f = f.parentNode;
                    if (r !== u && r !== i.hoverPoint) r.onMouseOver(t)
                };
            t(n.points, function(n) {
                n.graphic && (n.graphic.element.point = n);
                n.dataLabel && (n.dataLabel.element.point = n)
            });
            n._hasTracking || (t(n.trackerGroups, function(t) {
                if (n[t] && (n[t].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(n) {
                        e.onTrackerMouseOut(n)
                    }).css(o), gr)) n[t].on("touchstart", f)
            }), n._hasTracking = !0)
        },
        drawTrackerGraph: function() {
            var i = this,
                h = i.options,
                e = h.trackByArea,
                r = [].concat(e ? i.areaPath : i.graphPath),
                u = r.length,
                o = i.chart,
                v = o.pointer,
                y = o.renderer,
                f = o.options.tooltip.snap,
                c = i.tracker,
                s = h.cursor,
                p = s && {
                    cursor: s
                },
                s = i.singlePoints,
                n, l = function() {
                    o.hoverSeries !== i && i.onMouseOver()
                },
                a = "rgba(192,192,192," + (vt ? .0001 : .002) + ")";
            if (u && !e)
                for (n = u + 1; n--;) r[n] === "M" && r.splice(n + 1, 0, r[n + 1] - f, r[n + 2], "L"), (n && r[n] === "M" || n === u) && r.splice(n, 0, "L", r[n - 2] + f, r[n - 1]);
            for (n = 0; n < s.length; n++) u = s[n], r.push("M", u.plotX - f, u.plotY, "L", u.plotX + f, u.plotY);
            c ? c.attr({
                d: r
            }) : (i.tracker = y.path(r).attr({
                "stroke-linejoin": "round",
                visibility: i.visible ? "visible" : "hidden",
                stroke: a,
                fill: e ? a : ut,
                "stroke-width": h.lineWidth + (e ? 0 : 2 * f),
                zIndex: 2
            }).add(i.group), t([i.tracker, i.markerGroup], function(n) {
                if (n.addClass("highcharts-tracker").on("mouseover", l).on("mouseout", function(n) {
                        v.onTrackerMouseOut(n)
                    }).css(p), gr) n.on("touchstart", l)
            }))
        }
    };
    w.column && (kt.prototype.drawTracker = rt.drawTrackerPoint);
    w.pie && (w.pie.prototype.drawTracker = rt.drawTrackerPoint);
    w.scatter && (gt.prototype.drawTracker = rt.drawTrackerPoint);
    f(ru.prototype, {
        setItemEvents: function(n, t, i, r, u) {
            var f = this;
            (i ? t : n.legendGroup).on("mouseover", function() {
                n.setState("hover");
                t.css(f.options.itemHoverStyle)
            }).on("mouseout", function() {
                t.css(n.visible ? r : u);
                n.setState()
            }).on("click", function(t) {
                var i = function() {
                        n.setVisible()
                    },
                    t = {
                        browserEvent: t
                    };
                n.firePointEvent ? n.firePointEvent("legendItemClick", t, i) : y(n, "legendItemClick", t, i)
            })
        },
        createCheckboxForItem: function(n) {
            n.checkbox = ct("input", {
                type: "checkbox",
                checked: n.selected,
                defaultChecked: n.selected
            }, this.options.itemCheckboxStyle, this.chart.container);
            b(n.checkbox, "click", function(t) {
                y(n, "checkboxClick", {
                    checked: t.target.checked
                }, function() {
                    n.select()
                })
            })
        }
    });
    nt.legend.itemStyle.cursor = "pointer";
    f(kr.prototype, {
        showResetZoom: function() {
            var t = this,
                i = nt.lang,
                n = t.options.chart.resetZoomButton,
                r = n.theme,
                u = r.states,
                f = n.relativeTo === "chart" ? null : "plotBox";
            this.resetZoomButton = t.renderer.button(i.resetZoom, null, null, function() {
                t.zoomOut()
            }, r, u && u.hover).attr({
                align: n.position.align,
                title: i.resetZoomTitle
            }).add().align(n.position, !1, f)
        },
        zoomOut: function() {
            var n = this;
            y(n, "selection", {
                resetSelection: !0
            }, function() {
                n.zoom()
            })
        },
        zoom: function(i) {
            var u, e = this.pointer,
                f = !1,
                r;
            !i || i.resetSelection ? t(this.axes, function(n) {
                u = n.zoom()
            }) : t(i.xAxis.concat(i.yAxis), function(n) {
                var t = n.axis,
                    i = t.isXAxis;
                (e[i ? "zoomX" : "zoomY"] || e[i ? "pinchX" : "pinchY"]) && (u = t.zoom(n.min, n.max), t.displayBtn && (f = !0))
            });
            r = this.resetZoomButton;
            f && !r ? this.showResetZoom() : !f && yt(r) && (this.resetZoomButton = r.destroy());
            u && this.redraw(n(this.options.chart.animation, i && i.animation, this.pointCount < 100))
        },
        pan: function(n, i) {
            var u = this,
                f = u.hoverPoints,
                e;
            f && t(f, function(n) {
                n.setState()
            });
            t(i === "xy" ? [1, 0] : [1], function(t) {
                var s = n[t ? "chartX" : "chartY"],
                    i = u[t ? "xAxis" : "yAxis"][0],
                    f = u[t ? "mouseDownX" : "mouseDownY"],
                    h = (i.pointRange || 0) / 2,
                    o = i.getExtremes(),
                    c = i.toValue(f - s, !0) + h,
                    f = i.toValue(f + u[t ? "plotWidth" : "plotHeight"] - s, !0) - h;
                i.series.length && c > l(o.dataMin, o.min) && f < r(o.dataMax, o.max) && (i.setExtremes(c, f, !1, !1, {
                    trigger: "pan"
                }), e = !0);
                u[t ? "mouseDownX" : "mouseDownY"] = s
            });
            e && u.redraw(!1);
            a(u.container, {
                cursor: "move"
            })
        }
    });
    f(pi.prototype, {
        select: function(i, r) {
            var u = this,
                f = u.series,
                e = f.chart,
                i = n(i, !u.selected);
            u.firePointEvent(i ? "select" : "unselect", {
                accumulate: r
            }, function() {
                u.selected = u.options.selected = i;
                f.options.data[or(u, f.data)] = u.options;
                u.setState(i && "select");
                r || t(e.getSelectedPoints(), function(n) {
                    n.selected && n !== u && (n.selected = n.options.selected = !1, f.options.data[or(n, f.data)] = n.options, n.setState(""), n.firePointEvent("unselect"))
                })
            })
        },
        onMouseOver: function(n) {
            var u = this.series,
                t = u.chart,
                i = t.tooltip,
                r = t.hoverPoint;
            r && r !== this && r.onMouseOut();
            this.firePointEvent("mouseOver");
            i && (!i.shared || u.noSharedTooltip) && i.refresh(this, n);
            this.setState("hover");
            t.hoverPoint = this
        },
        onMouseOut: function() {
            var n = this.series.chart,
                t = n.hoverPoints;
            this.firePointEvent("mouseOut");
            t && or(this, t) !== -1 || (this.setState(), n.hoverPoint = null)
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var n = o(this.series.options.point, this.options).events,
                    t;
                this.events = n;
                for (t in n) b(this, t, n[t]);
                this.hasImportedEvents = !0
            }
        },
        setState: function(n, t) {
            var e = this.plotX,
                l = this.plotY,
                r = this.series,
                a = r.options.states,
                i = at[r.type].marker && r.options.marker,
                p = i && !i.enabled,
                h = i && i.states[n],
                w = h && h.enabled === !1,
                u = r.stateMarkerGraphic,
                s = this.marker || {},
                v = r.chart,
                c = r.halo,
                y, n = n || "";
            y = this.pointAttr[n] || r.pointAttr[n];
            n === this.state && !t || this.selected && n !== "select" || a[n] && a[n].enabled === !1 || n && (w || p && h.enabled === !1) || n && s.states && s.states[n] && s.states[n].enabled === !1 || (this.graphic ? (i = i && this.graphic.symbolName && y.r, this.graphic.attr(o(y, i ? {
                x: e - i,
                y: l - i,
                width: 2 * i,
                height: 2 * i
            } : {})), u && u.hide()) : (n && h && ((i = h.radius, s = s.symbol || r.symbol, u && u.currentSymbol !== s && (u = u.destroy()), u) ? u[t ? "animate" : "attr"]({
                x: e - i,
                y: l - i
            }) : s && (r.stateMarkerGraphic = u = v.renderer.symbol(s, e - i, l - i, 2 * i, 2 * i).attr(y).add(r.markerGroup), u.currentSymbol = s)), u && u[n && v.isInsidePlot(e, l, v.inverted) ? "show" : "hide"]()), (e = a[n] && a[n].halo) && e.size ? (c || (r.halo = c = v.renderer.path().add(r.seriesGroup)), c.attr(f({
                fill: yi(this.color || r.color).setOpacity(e.opacity).get()
            }, e.attributes))[t ? "animate" : "attr"]({
                d: this.haloPath(e.size)
            })) : c && c.attr({
                d: []
            }), this.state = n)
        },
        haloPath: function(n) {
            var t = this.series,
                i = t.chart,
                r = t.getPlotBox(),
                u = i.inverted;
            return i.renderer.symbols.circle(r.translateX + (u ? t.yAxis.len - this.plotY : this.plotX) - n, r.translateY + (u ? t.xAxis.len - this.plotX : this.plotY) - n, n * 2, n * 2)
        }
    });
    f(v.prototype, {
        onMouseOver: function() {
            var t = this.chart,
                n = t.hoverSeries;
            n && n !== this && n.onMouseOut();
            this.options.events.mouseOver && y(this, "mouseOver");
            this.setState("hover");
            t.hoverSeries = this
        },
        onMouseOut: function() {
            var i = this.options,
                n = this.chart,
                t = n.tooltip,
                r = n.hoverPoint;
            r && r.onMouseOut();
            this && i.events.mouseOut && y(this, "mouseOut");
            t && !i.stickyTracking && (!t.shared || this.noSharedTooltip) && t.hide();
            this.setState();
            n.hoverSeries = null
        },
        setState: function(n) {
            var t = this.options,
                r = this.graph,
                u = this.graphNeg,
                i = t.states,
                t = t.lineWidth,
                n = n || "";
            this.state !== n && (this.state = n, i[n] && i[n].enabled === !1 || (n && (t = i[n].lineWidth || t + (i[n].lineWidthPlus || 0)), r && !r.dashstyle && (n = {
                "stroke-width": t
            }, r.attr(n), u && u.attr(n))))
        },
        setVisible: function(n, i) {
            var r = this,
                f = r.chart,
                o = r.legendItem,
                e, s = f.options.chart.ignoreHiddenSeries,
                h = r.visible;
            e = (r.visible = n = r.userOptions.visible = n === u ? !h : n) ? "show" : "hide";
            t(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(n) {
                r[n] && r[n][e]()
            });
            f.hoverSeries === r && r.onMouseOut();
            o && f.legend.colorizeItem(r, n);
            r.isDirty = !0;
            r.options.stacking && t(f.series, function(n) {
                n.options.stacking && n.visible && (n.isDirty = !0)
            });
            t(r.linkedSeries, function(t) {
                t.setVisible(n, !1)
            });
            s && (f.isDirtyBox = !0);
            i !== !1 && f.redraw();
            y(r, e)
        },
        setTooltipPoints: function(n) {
            var f = [],
                e, s, i = this.xAxis,
                a = i && i.getExtremes(),
                c = i ? i.tooltipLen || i.len : this.chart.plotSizeX,
                h, o, v = [];
            if (!(this.options.enableMouseTracking === !1 || this.singularTooltips)) {
                for (n && (this.tooltipPoints = null), t(this.segments || this.points, function(n) {
                        f = f.concat(n)
                    }), i && i.reversed && (f = f.reverse()), this.orderTooltipPoints && this.orderTooltipPoints(f), n = f.length, o = 0; o < n; o++)
                    if (i = f[o], e = i.x, e >= a.min && e <= a.max)
                        for (h = f[o + 1], e = s === u ? 0 : s + 1, s = f[o + 1] ? l(r(0, ft((i.clientX + (h ? h.wrappedClientX || h.clientX : c)) / 2)), c) : c; e >= 0 && e <= s;) v[e++] = i;
                this.tooltipPoints = v
            }
        },
        show: function() {
            this.setVisible(!0)
        },
        hide: function() {
            this.setVisible(!1)
        },
        select: function(n) {
            this.selected = n = n === u ? !this.selected : n;
            this.checkbox && (this.checkbox.checked = n);
            y(this, n ? "select" : "unselect")
        },
        drawTracker: rt.drawTrackerGraph
    });
    f(tt, {
        Axis: ui,
        Chart: kr,
        Color: yi,
        Point: pi,
        Tick: yr,
        Renderer: dr,
        Series: v,
        SVGElement: it,
        SVGRenderer: ei,
        arrayMin: cr,
        arrayMax: ki,
        charts: ot,
        dateFormat: eu,
        format: ur,
        pathAnim: bu,
        getOptions: function() {
            return nt
        },
        hasBidiBug: wf,
        isTouchDevice: hf,
        numberFormat: bi,
        seriesTypes: w,
        setOptions: function(n) {
            return nt = o(!0, nt, n), ef(), nt
        },
        addEvent: b,
        removeEvent: st,
        createElement: ct,
        discardElement: ar,
        css: a,
        each: t,
        extend: f,
        map: br,
        merge: o,
        pick: n,
        splat: si,
        extendClass: ri,
        pInt: h,
        wrap: hr,
        svg: vt,
        canvas: bt,
        vml: !vt && !bt,
        product: "Highcharts",
        version: "4.0.4"
    })
})()