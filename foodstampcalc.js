
// helper functions
getInt = function(tagName) {
    var tagVal = parseInt($('#' + tagName).val().replace(/,/g,""));
    tagVal = isNaN(tagVal) ? 0 : tagVal;
	return tagVal;
};

//toggle eligible vs not eligible
update_eligibility = function(is_eligible) {
	if (is_eligible) {
		$('#is_eligible').show();
		$('#is_not_eligible').hide();
	}
	else {
		$('#is_eligible').hide();
		$('#is_not_eligible').show();		
	};
};

//toggle min footnote
update_footnote = function(is_below_min) {
	//alert("Footnote: " + is_below_min);
	if (is_below_min) {
		$('#below_min_fn').show();
		$('#below_min').show();
	}
	else {
		$('#below_min_fn').hide();
		$('#below_min').hide();
	};
};

//calculate freq amount
fc_calc = function(fcid) {
	// get amount and freq elements

	amts = $('input[id ^= ' + fcid + '_amount]');
	freqs = $('select[id ^= ' + fcid + '_freq]');
	
	// assume these come in same order
	result = 0;
	for (i = 0; i < amts.length; ++i) {
		amt = $(amts[i]).val().replace(/,/g,"");
		freq = $(freqs[i]).val();
		switch(freq) {
			case "W": result += amt * 4.3; break;
			case "B": result += amt * 2.15; break;
			case "M": result += amt * 1.0; break;
			case "Y": result += amt/12.0; break;
		};
	};
	
	$('#' + fcid).val(Math.round(result));
	update_total_gross_income();
};

// periodic calculator
// - used for calculating a periodic expense of income and getting per month value
period_calculator = function(id, title, source_list, freq_text, optional_tag) {
	
	html = '<div><div id="question"><p><table><tr>';
	html += '<th>' + optional_tag + '</th>';
	for (var i = 0; i < source_list.length; ++i) {
		source = source_list[i];
		html += '<th>' + source + '</th>';
	};
	html += '</tr><tr><td>Amount</td>';
	for (var i = 0; i < source_list.length; ++i) {
		html += '<td><input type="text" id="' + id + '_amount_' + i + '" size="10" onchange="fc_calc(\''+id+'\')"/></td>';
	};
	
	html += '</tr><tr><td>' + freq_text + '</td>';
	for (var i = 0; i < source_list.length; ++i) {
		html += '<td><select id="' + id + '_freq_' + i + '" onchange="fc_calc(\''+id+'\')">';
		html += '<option value="W">weekly</option><option value="B">bi-weekly</option><option value="M">monthly</option><option value="Y">yearly</option>';
		html += '</select></td>';
	};
	html += "</tr></table></p></div>";
		
	
	$("#periodcalc").html(html);
	$("#periodcalc").dialog({
		modal: true,
		minWidth: 700,
		title: title,
		buttons: {
			Calculate: function() {
				$( this ).dialog( "close" );
			}
	}});
};

// update household member box.  preserve entries when possible.
update_household_members = function() {
	var people_in_household = parseInt($('#q_people_in_household').val());
	if (people_in_household == 0) {
		return;
	}
	
	var hmems = "<table><tr><th>First Name</th><th>Citizenship Status</th></tr>"; 
	for (var i=0; i < people_in_household; ++i) {
		hmems += "<tr><td>";
		hmems += '<input type="text" onchange="update_all_member_forms();" class="member_name" id="hmem_name_' + i + '" size="20"';
		if ($('#hmem_name_' + i).length) {
			hmems += ' value="' + $('#hmem_name_' + i).val() + '" ';
		}
		else {
			hmems += ' value="Member ' +  (i+1) + '" ';
		}
		;
		hmems += '/>';
		hmems += "</td><td>";
		hmems += '<select class="member_status" onchange="update_total_gross_income();" id="hmem_status_' + i + '">';
		var status = 'None';
		if ($('#hmem_status_' + i).length) {
			status = $('#hmem_status_' + i).val();
		};
		hmems += '<option value="US" ';
		if (status == "US") {
			hmems += 'selected';
		};
		hmems += '>US citizen/qualified immigrant</option>';
		hmems += '<option value="other" ';
		if (status == "other") {
			hmems += 'selected';
		};
		hmems += '>not qualified immigrant/other</option>';
		hmems += '</select>';
		
		hmems += "</td></tr>";
    };
    hmems += "</table>";
    
    $("#household_members").html(hmems);
	update_all_member_forms();

};

// get member list
get_member_list = function() {
	member_list = new Array();
	$(".member_name").each(function(index) {member_list.push(($(this).val()).replace(/[\>\<\"\'\&]/g,""));} );
	return member_list;
};

//get member list
get_member_status_list = function() {
	member_status = new Array();
	$(".member_status").each(function(index) {member_status.push($(this).val());} );
	return member_status;
};

// update single section which uses household members in form
update_member_form = function(t, members) {
	// grab blank template from section - we'll use this to populate form
	
	template = '<tr style="display: none">' + t.find('tr:first').html() + '</tr>';
	
	var cnt = 0;
	var content = "";

	for (var i = 0; i < members.length; ++i) {
		var member = members[i];
		
		// do search and replace for name placeholders and then add to content
		nxt_cnt = template;
		nxt_cnt = nxt_cnt.replace(/style=\"display:\s*none\"/g, "");
		nxt_cnt = nxt_cnt.replace(/MBRCNT/g, cnt);
		nxt_cnt = nxt_cnt.replace(/MBRNAME/g, member);
		content += nxt_cnt;
		cnt += 1;
	}
	
	t.html(template + content);
};

// update all sections of form which use housemembers
update_all_member_forms = function() {
	members = get_member_list();
	$(".member_section").each(function(index) {update_member_form($(this), members);});
};


// calculate weighted results over household members
weighted_sum = function(name) {
	var status_list = get_member_status_list();	
	var eligible_sum = 0;
	var eligible = 0;
	var ineligible_sum = 0;
	var ineligible = 0;
	for (var i = 0; i < status_list.length; ++i) {
		amt = getInt(name + '_' + i);
		if (status_list[i] == 'US') {
			eligible++;
			eligible_sum += amt;
		}
		else {
			ineligible++;
			ineligible_sum += amt;
		}
	}
	return eligible_sum + eligible*1.0/(eligible+ineligible)*ineligible_sum;  
};

// calculate gross income, household limits and deductions
update_total_gross_income = function() {
    
	// HOUSEHOLD COMPOSITION ELIGIBLE VS INELIGIBLE
	var status_list = get_member_status_list();	
	var eligible = 0;
	var ineligible = 0;
	for (var i = 0; i < status_list.length; ++i) {
		if (status_list[i] == 'US') {
			eligible++;
		}
		else {
			ineligible++;
		}
	}

	var people_in_household = eligible + ineligible;
    $('#report_eligible_members').text(eligible);
    $('#report_ineligible_members').text(ineligible);
    $('#report_household_size').text(people_in_household);

    var factor = eligible*1.0/people_in_household;
    $('#report_household_weight').text(Math.round(100*factor)/100);
    
    
    // calculate household limit
    if (people_in_household > 0) {
		$(".buttonNext").removeClass("buttonDisabled");
	}
    else {
    	$(".buttonNext").addClass("buttonDisabled");
    };
    
    // CALC: INCOME
    var gross_income_limit = 0;
    var has_medical = $('#medical_status').val();
    var monthly_earned_income = weighted_sum('monthly_earned_income');
    $('#report_earned_income').text(Math.round(monthly_earned_income));
    var monthly_unearned_income = weighted_sum('monthly_unearned_income');
    $('#report_unearned_income').text(Math.round(monthly_unearned_income));
    var monthly_income = monthly_earned_income + monthly_unearned_income;
    $('#report_income').text(Math.round(monthly_income));
    
    // CALC:  IF RECEIVING SSI BENEFITS OR OVER 60/DISABLED, NO GROSS INCOME LIMIT
    //        OTHERWISE, LOOKUP LIMIT IN THE INCOME STDS TABLE
    //        (USING EITHER # PEOPLE IN HOUSEHOLD OR 8. WHICHEVER
    //        IS SMALLER).  IF MORE THAN 8 IN HOUSEHOLD, ADD 
    //        ADDITIONAL_INCOME_STD FOR EVERY ADDITIONAL PERSON
    if ($('#q_ssi_benefits').val() == 'Y' || has_medical == 'Y') {
    	gross_income_limit = 'N/A';
    	if ($('#q_ssi_benefits').val() == 'Y') {
    		$('#report_gross_income_limit_reason').text('(receives SSI)');
    	} else {
    		$('#report_gross_income_limit_reason').text('(over 60/disabled)');   		
    	}
    }
    else {
    	gross_income_limit = INCOME_STDS[Math.min(eligible, MAX_INCOME_STDS_HH)] + 
        Math.max(0, eligible-MAX_INCOME_STDS_HH)*ADDITIONAL_INCOME_STD;     
   		$('#report_gross_income_limit_reason').text('');   		
    }
    $('#report_gross_income_limit').text(gross_income_limit);

    
    // CALC:  CATEGORICALLY ELIGIBLE?  IF RECEIVING SSI BENEFITS THEN YES
    //        OTHERWISE, IF MONTHLY INCOME < GROSS INCOME LIMIT, THEN YES
    //        OTHERWISE, NO
    var ssi_benefits = $('#q_ssi_benefits').val();
    var categorically_eligible = '';
    if (ssi_benefits == 'Y' || has_medical == 'Y') {
        categorically_eligible = 'Yes';
        if (ssi_benefits == 'Y') {
        	$('#report_cat_eligible_reason').text('(receives SSI)');
        }
        else {
        	$('#report_cat_eligible_reason').text('(over 60/disabled)');
        }
    }
    else {
        if (monthly_income <= gross_income_limit) {
        	categorically_eligible = 'Yes';
        	$('#report_cat_eligible_reason').text('(MI <= GIL)');
        }
        else {
        	categorically_eligible = 'No';
        	$('#report_cat_eligible_reason').text('');
        }      	
    }
    $('#report_cat_eligible').text(categorically_eligible);

    // CALC: STANDARD DEDUCTIONS, LOOK UP THE STD DEDUCTION IN THE
    //       STANDARD_DEDUCTIONS TABLE BASED ON NUMBER OF PEOPLE IN HOUSEHOLD
    //       UP TO 8.  AFTER THAT TAKE MAX_STANDARD_DEDUCTION
    //       (09.09.11 - JLUNA ASKED TO REMOVE NUMBER DISQUALIFIED) 
    var std_deduction = 0;
    if (eligible <= MAX_ASSIST_UNIT_SIZE) {
        std_deduction = STANDARD_DEDUCTIONS[eligible];
    }
    else {
    	std_deduction = MAX_STANDARD_DEDUCTION;
    }
    $('#report_std_deduction').text(Math.round(std_deduction));

    // CALC:  EARNED INCOME DEDUCTION = 20% MONTHLY EARNED INCOME
    var earned_income_deduction = parseInt(0.2 * monthly_earned_income);
    $('#report_inc_deduction').text(Math.round(earned_income_deduction));

    // CALC:  MEDICAL EXPENSE DEDUCTION
    //        MUST HAVE AN ELDERLY OR DISABLED PERSON IN HH AND
    //        MEDICAL EXPENSES MUST BE GREATER THAN MIN_MEDICAL_EXPENSE
    //        CALC DEDUCTION AS MEDICAL EXPENSE - MIN MEDICAL EXPENSE
    var monthly_medical_expenses = getInt('monthly_medical_bills');
    var medical_deductible = 0;
    if (monthly_medical_expenses >= MIN_MEDICAL_EXPENSE && has_medical == "Y") {
        medical_deductible = monthly_medical_expenses - MIN_MEDICAL_EXPENSE;
    };
    $('#report_med_deduction').text(Math.round(medical_deductible));

    // CALC:  DEPENDENT CARE = SUM OF ALL LISTED DEPENDENTS
    var total_dep_care = 0;
    if ($('#dependent_status').val() == "Y") {
    	total_dep_care = weighted_sum('dep_monthly');
    };
    $('#report_dep_care').text(total_dep_care);
    	
    // CALC:  CHILD SUPPORT
    var child_support = 0;
    if ($('#child_support_status').val() == "Y") {
    	child_support = weighted_sum('child_support');
    }
    $('#report_child_support').text(Math.round(child_support));    
    
    // CALC:  PRELIM ADJUSTED GROSS INCOME IS
    //        MONTHLY INCOME - STD DEDUCTION - CHILD SUPPORT - TOTAL DEP CARE - MED DEDUCT
    var total_deductions = std_deduction + earned_income_deduction + child_support + total_dep_care + medical_deductible;
    $('#report_total_deductions').text(Math.round(total_deductions));    
    
    var prelim_adjusted_gross_income = Math.max(0, monthly_income - total_deductions);
    $('#report_prelim_adj_inc').text(Math.round(prelim_adjusted_gross_income));

    // CALC:  TOTAL HOUSING COST = MONTH + INSURANCE + PROPERTY TAXES
    var total_shelter = weighted_sum('shelter_cost');
    $('#report_shelter').text(Math.round(total_shelter));    
    
    // CALC:  UTILITY COST BASED ON RATES ABOVE
    var utility_allowance = 0;
    switch($('input:radio[name=utilities]:checked').val()) {
        case "heat": utility_allowance = UTILITY_HEATING_AND_COOLING; break;
        case "two_utilities": utility_allowance = UTILITY_TWO_UTILITIES; break;
        case "one_utility": utility_allowance = UTILITY_ONE_UTILITY; break;
        case "phone": utility_allowance = UTILITY_PHONE; break;
		case "none": utility_allowance = 0; break;
		default: utility_allowance = UTILITY_NO_UTILITIES; // not used?
    }
	
    $('#report_utility').text(Math.round(utility_allowance));    
    $('#report_total_shelter').text(Math.round(utility_allowance + total_shelter));
     
    // CALC:  50% ADJUSTED GROSS INCOME = 50% OF PRELIM ADJ GROSS INCOME
    var adj_gross_income_50p = 0.5*prelim_adjusted_gross_income;
    $('#report_adj_gi_50p').text(Math.round(adj_gross_income_50p));
    

    // CALC:  SHELTER COST IN EXCESS OF 50% ADJ GROSS INCOME
    //        HOUSING + UTIL - 50% ADJ GROSS INCOME
    var shelter_excess = Math.max(0, utility_allowance + total_shelter - adj_gross_income_50p);
    $('#report_shelter_excess').text(Math.round(shelter_excess));

    // CALC:  SHELTER DEDUCTION = SHELTER EXCESS IF MEDICAL OR DISABLED IN HH
    //        IF NO MED-DISABLED, THEN SHELTER DEDUCTION CAPPED
    var total_shelter_deduction = 0;
    if (has_medical == "Y") {
        total_shelter_deduction = shelter_excess;
    }
    else {
        total_shelter_deduction = Math.min(SHELTER_CAP, shelter_excess);
    }
    $('#report_shelter_deduction').text(Math.round(total_shelter_deduction));    
    
    
    // CALC:  NET INCOME = MONTHLY INCOME - DEDUCTIONS
    var net_income = Math.max(0, monthly_income - std_deduction - earned_income_deduction - medical_deductible - total_dep_care - 
    	                      child_support - total_shelter_deduction);
    $('#report_net_income').text(Math.round(net_income));    
    
    // CALC:  MAX ALLOWED INCOME FOR STD DEDUCTION - IF SSI BENEFITS THEN NO LIMIT
    //        OTHERWISE, LOOK UP IN MAX_ALLOW_INCOME_STD TABLE BASED ON # IN HH
    //        AFTER 8, ADDITIONAL AMOUNT FOR EACH ADDITIONAL MEMBER
    var net_income_limit = 0;
    if (ssi_benefits == 'Y') {
        net_income_limit = 'N/A (receives SSI)';
    } 
    else {
        net_income_limit = MAX_ALLOW_INCOME_STD[Math.min(eligible, MAX_ALLOW_INCOME_STD_HH)] + 
                           Math.max(0, eligible-MAX_ALLOW_INCOME_STD_HH)*ADDITIONAL_ALLOW_INCOME_STD;     
    }
    $('#report_income_limit').text(net_income_limit);    
    
 
    // CALC:  NET INCOME TEST - IF SSI BENFITS OR INCOME < INCOME LIMIT THENN PASS
    //        OTHERWISE FAIL
    var net_income_test = "";
    if (ssi_benefits == 'Y' || net_income <= net_income_limit) {
        net_income_test = 'PASS';
        if (ssi_benefits == 'Y') {
            $('#report_net_income_test_reason').text('(receives SSI)');            	
        }
        else {
            $('#report_net_income_test_reason').text('(NI <= NIL)');    
        }
    }
    else {
        net_income_test = 'FAIL';
        $('#report_net_income_test_reason').text('(NI > NIL)');    

    }
    $('#report_net_income_test').text(net_income_test);    

    // CALC:  MAX BENEFITS SIZE BASED ON MAX_ALLOTMENTS TABLE ACCORDING TO # IN HH
    var max_benefits_size = MAX_ALLOTMENTS[Math.min(eligible, MAX_ALLOTMENTS_HH)] + 
                            Math.max(0, eligible-MAX_ALLOTMENTS_HH)*ADDITIONAL_ALLOTMENT;     
                                                       
    // CALC:  BENEFITS SIZE - MUST BE CATEGORICALLY ELIGIBLE
    //        IF PASS INCOME TEST THEN BENEFIT IS MAX BENEFIT - 30% NET INCOME
    var your_benefit = 0;
    var ni30 = Math.ceil(0.3*net_income);
    $('#report_net_income_30p').text(Math.round(ni30));   
    $('#report_max_benefit_size').text(Math.round(max_benefits_size));   
    if (categorically_eligible == 'Yes') {
        if (net_income_test == 'PASS') {
            if (max_benefits_size - ni30 > SNAP_MIN_AMT) {
                your_benefit = max_benefits_size - ni30;
                update_eligibility(true);
				update_footnote(your_benefit < SNAP_MIN_EXP);

                $('#report_exp_benefit_reason').text('CE and NIT ok, MB - NI30');
            }
            else {
                if (eligible > 2) {
                    your_benefit = "minimal -- probably less than $" + SNAP_MIN_AMT;
                    update_eligibility(false);
					update_footnote(true); // still available under SNAP Exp?
                    $('#report_exp_benefit_reason').text('CE and NIT ok, MB - NI30 < ' + SNAP_MIN_AMT + ', EM > 2');
                }
                else {
                    $('#report_exp_benefit_reason').text('CE and NIT ok, MB - NI30 < ' + SNAP_MIN_AMT + ', EM <= 2');
                	your_benefit = SNAP_MIN_AMT;
                	update_eligibility(true);
					update_footnote(true);
                }
            }
        }
        else {
            // 2014.07.02 - told that any income test fail should not get
            // benefits
            your_benefit = "minimal -- probably less than $" + SNAP_MIN_AMT;
            $('#report_exp_benefit_reason').text('CE = Y, NIT = FAIL');
            update_eligibility(false);
			update_footnote(true); // still available under SNAP Exp?
        }
    } 
    else {
    	your_benefit = 0;
        update_eligibility(false);
		update_footnote(false);
        $('#report_exp_benefit_reason').text('CE = N');
    }
    $('#report_exp_benefit').text(Math.round(your_benefit));   

    
    $('#your_benefit').text(Math.round(your_benefit));
};


$(document).ready(function(){
	// Smart Wizard
	$('#wizard').smartWizard({transitionEffect:'slide', onLeaveStep:leaveAStepCallback, labelFinish:'Exit', enableFinishButton: true, onFinish: confirm_exit});
 	
	function confirm_exit(obj) {
	    $("#exit_confirm").dialog({modal: true, 
	    	buttons : {
	        "Yes" : function() {
	          window.location.href = DC_HUNGER_URL;
	        },
	        "No" : function() {
	          $(this).dialog("close");
	        }
	    }});		
	    $("#exit_confirm").dialog("open");
	};
	    

	function leaveAStepCallback(obj){
		var step_num = obj.attr('rel'); 
		
        if (step_num <= 1 && $(".buttonNext").hasClass("buttonDisabled")) {
        	// don't go forward from first page until allowed
        	return false;
        }
        return true;
    }
	
	$( ".footnote" ).dialog({
		autoOpen: false
	});
	
	$(".hasfootnote").each(function(intIndex) {
		$(this).click(function() {
			$( "div#" + this.id).dialog( "open" );
			return false;

		});
	});

	$( ".report" ).dialog({
		autoOpen: false,
		width: 510,
		height: 450
	});
	
	$(".hasreport").each(function(intIndex) {
		$(this).click(function() {
			$( "div#" + this.id).dialog( "open" );
			return false;

		});
	});
	
	$( ".hashidden" ).each(function(intIndex) {
		if ($(this).is("select")) {					 
			if ($(this).val() == "Y") {            
        		$("div#" + this.id).show();
          	} else {             
            	$("div#" + this.id).hide();
          	}
		} else {
			if ($(this).attr('checked')) {            
        		$("div#" + this.id).show();
          	} else {             
            	$("div#" + this.id).hide();
          	}
		}
	});
	
	
	$(".hashidden").each(function(intIndex) {
		if ($(this).is("select")) {			
			$(this).change(function() {
				if ($(this).val() == "Y") {            
	        		$("div#" + this.id).fadeIn("slow");
	          	} else {             
	            	$("div#" + this.id).fadeOut("slow");
	          	}
			});
		} else {
			$(this).click(function() {
				if ($(this).attr('checked')) {            
	        		$("div#" + this.id).fadeIn("slow");
	          	} else {             
	            	$("div#" + this.id).fadeOut("slow");
	          	}
			});
		}
	});
	
	// disable next button if no household number selected
	var people_in_household = parseInt($('#q_people_in_household').val());
	if (people_in_household == 0) {
		$(".buttonNext").addClass("buttonDisabled");
	}
	else {
		update_household_members();
	}
	
	$("#welcome").dialog({
		modal: true,
		minWidth: 600,
		buttons: {
			Start: function() {
				$( this ).dialog( "close" );
			}
	}});
		
	
	$("#data_version").text(CALC_DATA_VERSION);
	
});

