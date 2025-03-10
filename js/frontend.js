! function($) {
	"use strict";

	function e(e) {
		return e && "object" == typeof e && "default" in e ? e : {
			default: e
		}
	}
	var t = e(jQuery);
	(new function() {
		var e = this;
		this.init = function() {
			window.ppFormRecaptchaLoadCallback = this.recaptcha_processing, t.default(".pp-del-profile-avatar").on("click", this.delete_avatar), t.default(".pp-del-cover-image").on("click", this.delete_profile_image_cover), t.default(document).on("click", ".has-password-visibility-icon .pp-form-material-icons", this.toggle_password_visibility), t.default(document.body).on("click", "a.showlogin", (function() {
				t.default(".pp_wc_login").slideToggle()
			})), t.default(window).on("load resize", (function() {
				e.defaultUserProfileResponsive()
			})), "true" !== pp_ajax_form.disable_ajax_form && (t.default(document).on("submit", 'form[data-pp-form-submit="login"]', this.ajax_login), t.default(document).on("submit", 'form[data-pp-form-submit="signup"]', this.ajax_registration), t.default(document).on("submit", 'form[data-pp-form-submit="passwordreset"]', this.ajax_password_reset), t.default(document).on("submit", 'form[data-pp-form-submit="editprofile"]', this.ajax_edit_profile), t.default(".ppress-confirm-delete").on("click", (function(e) {
				e.preventDefault(), confirm(pp_ajax_form.confirm_delete) && (window.location.href = t.default(this).attr("href"))
			})))
		}, this.recaptcha_processing = function() {
			t.default(".pp-g-recaptcha").each((function(s, a) {
				var r = t.default(a).attr("data-sitekey"),
					p = t.default(this).parents(".pp-form-container").find("form");
				if ("v3" === t.default(a).attr("data-type")) p.find("input.pp-submit-form").on("click", (function(s) {
					s.preventDefault(), e._add_processing_label(p), grecaptcha.ready((function() {
						grecaptcha.execute(r, {
							action: "form"
						}).then((function(e) {
							p.find('[name="g-recaptcha-response"]').remove(), p.append(t.default("<input>", {
								type: "hidden",
								value: e,
								name: "g-recaptcha-response"
							})), p.submit()
						}))
					}))
				}));
				else {
					var o = grecaptcha.render(a, {
						sitekey: r,
						theme: t.default(a).attr("data-theme"),
						size: t.default(a).attr("data-size")
					});
					p.on("pp_form_submitted", (function() {
						grecaptcha.reset(o)
					}))
				}
			}))
		}, this.toggle_password_visibility = function(e) {
			e.preventDefault();
			var s = t.default(this).parents(".pp-form-field-input-textarea-wrap").find(".pp-form-field");
			"password" === s.attr("type") ? (s.attr("type", "text"), t.default(this).text("visibility_off")) : (s.attr("type", "password"), t.default(this).text("visibility"))
		}, this.ajax_edit_profile = function(s) {
			if (void 0 !== window.FormData && window.FormData) {
				s.preventDefault();
				var a = t.default('form[data-pp-form-submit="editprofile"]'),
					r = e.get_melange_id(a),
					p = new FormData(this);
				p.append("action", "pp_ajax_editprofile"), p.append("nonce", pp_ajax_form.nonce), p.append("melange_id", r), t.default(".profilepress-edit-profile-status").remove(), t.default(".profilepress-edit-profile-success").remove(), "" !== window.edit_profile_msg_class && t.default("." + window.edit_profile_msg_class).remove(), e._add_processing_label(a), t.default.post({
					url: pp_ajax_form.ajaxurl,
					data: p,
					cache: !1,
					contentType: !1,
					enctype: "multipart/form-data",
					processData: !1,
					dataType: "json",
					success: function(s) {
						a.trigger("pp_form_submitted"), a.trigger("pp_form_edit_profile_success", [a]), "avatar_url" in s && "" !== s.avatar_url && (t.default("img[data-del='avatar'], img.pp-user-avatar").attr("src", s.avatar_url), t.default("input[name=eup_avatar]", a).val("")), "cover_image_url" in s && "" !== s.cover_image_url && (t.default("img[data-del='cover-image'], img.pp-user-cover-image").attr("src", s.cover_image_url), t.default("input[name=eup_cover_image]", a).val(""), t.default(".profilepress-myaccount-has-cover-image", a).show(), t.default(".profilepress-myaccount-cover-image-empty", a).hide()), "message" in s && (window.edit_profile_msg_class = t.default(s.message).attr("class"), a.before(s.message)), "redirect" in s && (a.trigger("pp_edit_profile_success_before_redirect"), window.location.assign(s.redirect)), e._remove_processing_label(a)
					}
				}, "json")
			}
		}, this.ajax_password_reset = function(s) {
			s.preventDefault();
			var a = t.default(this),
				r = e.get_melange_id(a),
				p = "true" === a.find('input[name="is-pp-tab-widget"]').val(),
				o = {
					action: "pp_ajax_passwordreset",
					data: t.default(this).serialize() + "&melange_id=" + r
				};
			e._remove_status_notice(), a.parents(".pp-tab-widget-form").prev(".pp-tab-status").remove(), e._add_processing_label(a), t.default.post(pp_ajax_form.ajaxurl, o, (function(s) {
				if (a.trigger("pp_form_submitted"), "object" != typeof s) return e._remove_processing_label(a);
				if ("message" in s) {
					if (a.trigger("pp_password_reset_status"), p) {
						var r = s.message.replace("profilepress-reset-status", "pp-tab-status");
						a.parents(".pp-tab-widget-form").before(r)
					} else a.parents(".lucidContainer").length > 0 ? a.parents(".lucidContainer").before(s.message) : a.before(s.message);
					"status" in s && !0 === s.status && a.hide(), t.default('input[name="user_login"]', a).val("")
				}
				e._remove_processing_label(a)
			}), "json")
		}, this.ajax_registration = function(s) {
			if (void 0 !== window.FormData && window.FormData) {
				s.preventDefault();
				var a = t.default(this),
					r = e.get_melange_id(a),
					p = new FormData(this),
					o = "true" === a.find('input[name="is-pp-tab-widget"]').val();
				p.append("action", "pp_ajax_signup"), p.append("melange_id", r), e._remove_status_notice(), a.parents(".pp-tab-widget-form").prev(".pp-tab-status").remove(), e._add_processing_label(a), t.default.post({
					url: pp_ajax_form.ajaxurl,
					data: p,
					cache: !1,
					contentType: !1,
					enctype: "multipart/form-data",
					processData: !1,
					dataType: "json",
					success: function(t) {
						if (a.trigger("pp_form_submitted"), "object" != typeof t) return e._remove_processing_label(a);
						if ("message" in t)
							if (a.trigger("pp_registration_error", [t]), a.trigger("pp_registration_ajax_response", [t]), o) {
								var s = t.message.replace("profilepress-reg-status", "pp-tab-status");
								a.parents(".pp-tab-widget-form").before(s)
							} else a.parents(".lucidContainer").length > 0 ? a.parents(".lucidContainer").before(t.message) : a.before(t.message);
						else "redirect" in t && (a.trigger("pp_registration_success", [t]), window.location.assign(t.redirect));
						e._remove_processing_label(a)
					}
				})
			}
		}, this.ajax_login = function(s) {
			s.preventDefault();
			var a = t.default(this),
				r = {
					action: "pp_ajax_login",
					data: t.default(this).serialize()
				},
				p = "true" === a.find('input[name="is-pp-tab-widget"]').val();
			e._remove_status_notice(), e._add_processing_label(a), t.default.post(pp_ajax_form.ajaxurl, r, (function(t) {
				if (a.trigger("pp_form_submitted"), null === t || "object" != typeof t) return e._remove_processing_label(a);
				if ("success" in t && !0 === t.success && "redirect" in t) a.trigger("pp_login_form_success"), window.location.assign(t.redirect);
				else if (a.trigger("pp_login_form_error"), "code" in t && "pp2fa_auth_code_invalid" == t.code && a.find(".pp-2fa").show(), p) {
					var s = t.message.replace("profilepress-login-status", "pp-tab-status");
					a.parents(".pp-tab-widget-form").before(s)
				} else a.parents(".lucidContainer").length > 0 ? a.parents(".lucidContainer").before(t.message) : a.before(t.message);
				e._remove_processing_label(a)
			}), "json")
		}, this.delete_avatar = function(e) {
			e.preventDefault();
			var s = t.default(this).text(),
				a = t.default(this);
			e.preventDefault(), confirm(pp_ajax_form.confirm_delete) && (a.is("button") && a.text(pp_ajax_form.deleting_text), t.default.post(pp_ajax_form.ajaxurl, {
				action: "pp_del_avatar",
				nonce: pp_ajax_form.nonce
			}).done((function(e) {
				"error" in e && "nonce_failed" === e.error ? (a.text(s), alert(pp_ajax_form.deleting_error)) : "success" in e && (t.default("img[data-del='avatar']").attr("src", e.default), a.remove())
			})))
		}, this.delete_profile_image_cover = function(e) {
			e.preventDefault();
			var s = t.default(this).text(),
				a = t.default(this);
			e.preventDefault(), confirm(pp_ajax_form.confirm_delete) && (a.is("button") && a.text(pp_ajax_form.deleting_text), t.default.post(pp_ajax_form.ajaxurl, {
				action: "pp_del_cover_image",
				nonce: pp_ajax_form.nonce
			}).done((function(e) {
				"error" in e && "nonce_failed" === e.error && (a.text(s), alert(pp_ajax_form.deleting_error)), "success" in e && ("" !== e.default ? (t.default("img[data-del='cover-image']").attr("src", e.default), a.parent().find(".profilepress-myaccount-has-cover-image").show(), a.parent().find(".profilepress-myaccount-cover-image-empty").hide()) : (a.parent().find(".profilepress-myaccount-has-cover-image").hide(), a.parent().find(".profilepress-myaccount-cover-image-empty").show()), a.remove())
			})))
		}, this.get_melange_id = function(e) {
			var s = t.default("input.pp_melange_id", e).val();
			return void 0 === s ? "" : s
		}, this._add_processing_label = function(e) {
			var t = e.find("input[data-pp-submit-label]");
			t.attr({
				value: t.data("pp-processing-label"),
				disabled: "disabled"
			}).css("opacity", ".4")
		}, this._remove_processing_label = function(e) {
			var t = e.find("input[data-pp-submit-label]");
			t.attr("value", t.data("pp-submit-label")), t.attr({
				value: t.data("pp-submit-label"),
				disabled: null
			}).css("opacity", "")
		}, this._remove_status_notice = function() {
			t.default(".profilepress-login-status,.pp-tab-status,.profilepress-edit-profile-success,.profilepress-edit-profile-status,.pp-reset-success,.profilepress-reset-status,.profilepress-reg-status").remove()
		}, this.defaultUserProfileResponsive = function() {
			t.default(".ppress-default-profile, .pp-member-directory, .ppress-checkout__form").each((function() {
				var e = t.default(this),
					s = e.width();
				s <= 340 ? (e.removeClass("ppressui340"), e.removeClass("ppressui500"), e.removeClass("ppressui800"), e.removeClass("ppressui768"), e.removeClass("ppressui960"), e.addClass("ppressui340")) : s <= 500 ? (e.removeClass("ppressui340"), e.removeClass("ppressui500"), e.removeClass("ppressui768"), e.removeClass("ppressui800"), e.removeClass("ppressui960"), e.addClass("ppressui500")) : s <= 768 ? (e.removeClass("ppressui340"), e.removeClass("ppressui500"), e.removeClass("ppressui768"), e.removeClass("ppressui800"), e.removeClass("ppressui960"), e.addClass("ppressui768")) : s <= 800 ? (e.removeClass("ppressui340"), e.removeClass("ppressui500"), e.removeClass("ppressui768"), e.removeClass("ppressui800"), e.removeClass("ppressui960"), e.addClass("ppressui800")) : s <= 960 ? (e.removeClass("ppressui340"), e.removeClass("ppressui500"), e.removeClass("ppressui768"), e.removeClass("ppressui800"), e.removeClass("ppressui960"), e.addClass("ppressui960")) : s > 960 && (e.removeClass("ppressui340"), e.removeClass("ppressui500"), e.removeClass("ppressui768"), e.removeClass("ppressui800"), e.removeClass("ppressui960")), e.css("opacity", 1)
			})), t.default(".ppress-default-profile-cover, .ppress-default-profile-cover-e").each((function() {
				var e = t.default(this),
					s = Math.round(e.width() / e.data("ratio")) + "px";
				e.height(s), e.find(".ppress-dpf-cover-add").height(s)
			}))
		}
	}).init(), (new function() {
		let e = this;
		window.ppressCheckoutForm = this, this.init = function() {
			"0" !== pp_ajax_form.is_checkout && 0 !== t.default("#ppress_checkout_main_form").length && (t.default(document).on("click", ".ppress-checkout-show-login-form", this.toggle_login_form), t.default(document).on("click", '.ppress-login-submit-btn input[type="submit"]', this.process_login), t.default(document).on("click", ".ppress-coupon-code-link", this.toggle_discount_code_reveal), t.default(document).on("click", ".ppress-apply-discount-btn", this.apply_discount_code), t.default(document).on("click", "#ppress-remove-applied-coupon", this.remove_applied_discount_code), t.default(document).on("submit", "#ppress_mb_checkout_form", this.process_checkout), t.default(document).on("click", ".ppress-terms-and-conditions-link", (function(e) {
				var s = t.default(".ppress-checkout-form__terms_condition__content");
				s.length > 0 && (e.preventDefault(), s.slideToggle())
			})), t.default(document).on("ppress_update_checkout", this.update_checkout), "1" === pp_ajax_form.is_checkout_tax_enabled ? t.default(document).on("change", "#ppress_mb_checkout_form .ppress_billing_country, #ppress_mb_checkout_form .ppress_billing_state, #ppress_mb_checkout_form .ppress_vat_number", e.debounce((function() {
				t.default(document.body).trigger("ppress_update_checkout")
			}), 200)) : t.default(document).on("change", "#ppress_mb_checkout_form .ppress_billing_country", e.contextual_state_field), t.default(document.body).on("change", "#ppress_checkout_payment_methods [name=ppress_payment_method]", (function() {
				t.default(document.body).trigger("ppress_update_checkout")
			})), t.default(document.body).trigger("ppress_update_checkout"), t.default(document).ajaxError((function() {
				e.remove_spinner()
			})))
		}, this.debounce = function(e, t) {
			let s;
			return t = t || 600,
				function() {
					clearTimeout(s), s = setTimeout((function() {
						e()
					}), t)
				}
		}, this.contextual_state_field = function() {
			let e = t.default(".ppress_billing_state"),
				s = {
					action: "ppress_contextual_state_field",
					country: t.default(this).val(),
					name: e.prop("name"),
					id: e.prop("id"),
					class: e.prop("class"),
					csrf: t.default("#ppress_checkout_nonce").val()
				};
			t.default.post(pp_ajax_form.ajaxurl, s, (function(t) {
				e.replaceWith(t.data)
			}))
		}, this.scroll_to_notices = function(e) {
			(e = e || t.default(".ppress-checkout-alert")).length && t.default("html, body").animate({
				scrollTop: e.offset().top - 100
			}, 1e3)
		}, this.update_checkout = function() {
			e.removeAllAlerts(), e.add_spinner();
			let s = {
				action: "ppress_update_order_review",
				plan_id: t.default("#ppress-checkout-plan-id").val(),
				ppress_payment_method: t.default("#ppress_checkout_payment_methods [name=ppress_payment_method]:checked").val(),
				csrf: t.default("#ppress_checkout_nonce").val(),
				address: t.default(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_address").val(),
				city: t.default(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_city").val(),
				country: t.default(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_country").val(),
				state: t.default(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_state").val(),
				postcode: t.default(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_postcode").val(),
				phone: t.default(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_phone").val(),
				vat_number: t.default("#ppress_checkout_main_form .ppress_vat_number").val(),
				post_data: t.default("#ppress_mb_checkout_form").serialize()
			};
			t.default.post(pp_ajax_form.ajaxurl, s, (function(a) {
				let r = {};
				if (t.default(".ppress-checkout-form__payment_method :input").each((function() {
						let e = t.default(this).attr("id");
						e && (-1 !== t.default.inArray(t.default(this).attr("type"), ["checkbox", "radio"]) ? r[e] = t.default(this).prop("checked") : r[e] = t.default(this).val())
					})), "data" in a && void 0 !== a.data.fragments && (t.default.each(a.data.fragments, (function(s, a) {
						e.fragments && e.fragments[s] === a || t.default(s).replaceWith(a)
					})), e.fragments = s.fragments), t.default.isEmptyObject(r) || t.default(".ppress-checkout-form__payment_method :input").each((function() {
						let e = t.default(this).attr("id");
						e && (-1 !== t.default.inArray(t.default(this).attr("type"), ["checkbox", "radio"]) ? t.default(this).prop("checked", r[e]) : (t.default.inArray(t.default(this).attr("type"), ["select"]), t.default(this).val(r[e])))
					})), "success" in a && !1 === a.success) {
					let e = t.default("#ppress_checkout_main_form");
					a.data && e.prepend(a.data), e.find(".input-text, select, input:checkbox").trigger("blur")
				}
				t.default(document.body).trigger("ppress_updated_checkout", [a]);
				let p, o = t.default(".ppress-checkout_order_summary__bottom_details");
				(p = t.default(".ppress-checkout-alert")).length > 0 && (o = p), e.scroll_to_notices(o), e.remove_spinner()
			}))
		}, this.toggle_login_form = function(e) {
			e.preventDefault(), t.default("#ppress_checkout_account_info .ppress-main-checkout-form__login_form_wrap").slideToggle()
		}, this.toggle_discount_code_reveal = function(e) {
			e.preventDefault(), t.default("#ppress-checkout-coupon-code-wrap").slideToggle()
		}, this.apply_discount_code = function(s) {
			s.preventDefault(), e.removeAllAlerts(), e.add_spinner();
			let a = {
				action: "ppress_checkout_apply_discount",
				plan_id: t.default("#ppress-checkout-plan-id").val(),
				coupon_code: t.default("#apply-discount").val(),
				ppress_checkout_nonce: t.default("#ppress_checkout_nonce").val()
			};
			t.default.post(pp_ajax_form.ajaxurl, a, (function(s) {
				"success" in s && !0 === s.success ? t.default(document.body).trigger("ppress_update_checkout") : (t.default(".ppress-checkout_order_summary-wrap").before(s.data), e.remove_spinner())
			}))
		}, this.remove_applied_discount_code = function(s) {
			s.preventDefault(), e.removeAllAlerts(), e.add_spinner();
			let a = {
				action: "ppress_checkout_remove_discount",
				plan_id: t.default("#ppress-checkout-plan-id").val(),
				ppress_checkout_nonce: t.default("#ppress_checkout_nonce").val()
			};
			t.default.post(pp_ajax_form.ajaxurl, a, (function(s) {
				"success" in s && !0 === s.success ? t.default(document.body).trigger("ppress_update_checkout") : (t.default(".ppress-checkout_order_summary-wrap").before(s.data), e.remove_spinner())
			}))
		}, this.process_login = function(s) {
			s.preventDefault(), e.removeAllAlerts(), e.add_spinner();
			let a = {
				action: "ppress_process_checkout_login",
				ppmb_user_login: t.default("#ppress_mb_checkout_form #ppmb_user_login").val(),
				ppmb_user_pass: t.default("#ppress_mb_checkout_form #ppmb_user_pass").val(),
				ppress_checkout_nonce: t.default("#ppress_checkout_nonce").val()
			};
			t.default.post(pp_ajax_form.ajaxurl, a, (function(s) {
				"success" in s && (!0 === s.success ? window.location.reload() : "data" in s && t.default("#ppress_mb_checkout_form .ppress-login-submit-btn").prepend(s.data)), e.remove_spinner()
			}))
		}, this.process_checkout = function(s) {
			if ("function" != typeof this.checkValidity || !1 !== this.checkValidity()) {
				s.preventDefault(), e.removeAllAlerts(), e.add_spinner();
				var a = t.default(this),
					r = e.get_payment_method();
				if (!1 !== a.triggerHandler("ppress_checkout_place_order_" + r)) {
					let s = new FormData(this);
					s.append("action", "ppress_process_checkout"), s.append("ppress_checkout_nonce", t.default("#ppress_checkout_nonce").val()), t.default.post({
						url: pp_ajax_form.ajaxurl,
						data: s,
						cache: !1,
						contentType: !1,
						enctype: "multipart/form-data",
						processData: !1,
						dataType: "json",
						success: function(s) {
							if ("success" in s) return !0 === s.success ? void(!1 !== a.triggerHandler("ppress_process_checkout_" + r, [s, r]) && ("redirect_url" in s && void 0 !== s.redirect_url && s.redirect_url.length > 0 ? window.location.assign(s.redirect_url) : (t.default(document.body).trigger("ppress_checkout_success", [s, r]), window.location.assign(s.order_success_url)))) : "error_message" in s ? e.createAlertMessage(s.error_message) : "data" in s && "string" == typeof s.data ? e.createAlertMessage(s.data) : void 0;
							e.remove_spinner()
						},
						error: function(t, s, a) {
							e.createAlertMessage(a)
						}
					}, "json")
				}
			}
		}, this.get_payment_method = function() {
			return t.default("#ppress_mb_checkout_form").find('input[name="ppress_payment_method"]:checked').val()
		}, this.createAlertMessage = function(e, s) {
			s = s || "error";
			var a = void 0 !== e.indexOf && -1 !== e.indexOf("ppress-checkout-alert"),
				r = "";
			a || (r = '<div class="ppress-checkout-alert ppress-' + s + '"><p>'), r += e, a || (r += "</p></div>"), t.default("#ppress_checkout_main_form").prepend(r), ppressCheckoutForm.scroll_to_notices(), ppressCheckoutForm.remove_spinner(), t.default(document.body).trigger("ppress_checkout_error", [e])
		}, this.removeAllAlerts = function() {
			t.default(".ppress-checkout-alert").remove()
		}, this.add_spinner = function() {
			t.default(".ppress-checkout__form").prepend('<div class="ppress-checkout__form__preloader"><div class="ppress-checkout__form__spinner"></div></div>')
		}, this.remove_spinner = function() {
			t.default(".ppress-checkout__form .ppress-checkout__form__preloader").remove()
		}, this.is_var_defined = function(e) {
			return null != e
		}
	}).init()
}();