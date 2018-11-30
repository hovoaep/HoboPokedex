import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";
import { Button } from "antd";

import { getCurrentProfile } from "../actions/userDataActions";

import axios from "axios";
// let test = `<div class="col-lg-12">
// <h1>Registration successful</h1>
// <hr>
// <div class="well">
//     <div class="row">
//         <div class="col-md-1">
//           <img src="/images/profil_save.png" alt="Register Success" class="hidden-xs">
//         </div>
//         <div class="col-md-11">
//             <h3>Your user login was created successfully.</h3>
//         </div>
//     </div>

//     <div class="row m-t-1">
//         <div class="col-md-1">
//         </div>
//         <div class="col-md-11">
//             We sent an email with an <strong>activation link</strong> to your account to the following address
//         </div>
//     </div>

//     <div class="row m-t-1">
//         <div class="col-md-1">
//         </div>
//         <div class="col-md-11">
//             <div class="well center txt-color-white bg-color-gray-dark m-t-1">
//                     <span class="hidden-xs text_xlarge">hovoaep@gmail.com</span>
//                     <span class="visible-xs text_large">hovoaep@gmail.com</span>
//             </div>
//         </div>
//     </div>

//     <div class="row">
//         <div class="col-md-1">
//         </div>
//         <div class="col-md-11">
//             Please check your mailbox now and open this mail. If you did not receive the message or you misspelled your email address please write to <a href="mailto:office@freelancermap.de">office@freelancermap.de</a>.<br><br>We are happy to welcome you as a new member to our platform.
//         </div>
//     </div>
// </div>

// <div class="row">
//     <div class="col-md-4">
//         <div class="well m-t-1">
//             <form id="registerfeedback_form" name="registerfeedback_form" action="/index.php?module=user&amp;func=register_processmail" method="post">
//             <input type="hidden" value="Probe" name="registerfeedback_accounttype">
//             <div id="registerfeedback_form_wrapper">
//                 <table id="registerfeedback_kontakt_table">
//                     <tbody><tr>
//                         <td colspan="2">
//                             <span><strong id="feed_head">How did you find out about us?</strong></span>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colspan="2"><span class="small registerfeedback_form_hint registerfeedback_form_hint_header">We would be glad, if you fill out the following survey form. The participation is of course anonymized and optional.</span></td>
//                     </tr>
//                     <tr>
//                         <td colspan="2" class="p-t-1">
//                             <table>
//                                 <tbody><tr>
//                                     <td><input type="radio" id="registerfeedback_google" name="registerfeedback" value="1"></td>
//                                     <td><label for="registerfeedback_google" id="label_google" class="p-l-1">Google</label></td>
//                                 </tr>
//                                                                         <tr>
//                                         <td><input type="radio" id="registerfeedback_linkedin" name="registerfeedback" value="5"></td>
//                                         <td><label for="registerfeedback_linkedin" id="label_linkedin" class="p-l-1">LinkedIn</label></td>
//                                     </tr>
//                                     <tr>
//                                         <td><input type="radio" id="registerfeedback_mail" name="registerfeedback" value="6"></td>
//                                         <td><label for="registerfeedback_mail" id="label_mail" class="p-l-1">Mail</label></td>
//                                     </tr>
//                                                                    <tr>
//                                     <td><input type="radio" id="registerfeedback_empf" name="registerfeedback" value="2"></td>
//                                     <td><label for="registerfeedback_empf" id="label_empf" class="p-l-1">Personal recommendation</label></td>
//                                 </tr>
//                                 <tr>
//                                     <td><input type="radio" id="registerfeedback_ad" name="registerfeedback" value="3"></td>
//                                     <td><label for="registerfeedback_ad" id="label_ad" class="p-l-1">Advertisement</label></td>
//                                 </tr>
//                                 <tr>
//                                     <td><input type="radio" id="registerfeedback_misc" name="registerfeedback" value="4"></td>
//                                     <td><label for="registerfeedback_misc" id="label_misc" class="p-l-1">Other</label></td>
//                                 </tr>
//                             </tbody></table>
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colspan="2"><input type="text" name="register_feedback_misc_text" id="register_feedback_misc_text" value=""></td>
//                     </tr>
//                     <tr>
//                         <td colspan="2">
//                             <div id="registerfeedback_submit" class="m-t-1">
//                                 <a href="#" id="submit" class="btn btn-success btn-sm">
//                                     <span>Send form</span>
//                                 </a>
//                             </div>
//                         </td>
//                     </tr>
//                 </tbody></table>
//             </div>
//         </form>
//         </div>
//     </div>
// </div>

// </div>`

class Test extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        <h1>Testtttttttt</h1>
        <Button type="primary">Primary</Button>

        <Icon type="heart-o" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Test);
