import { Component } from 'react'
import Layout from '../components/layout';
import sessionManager from '../utils/session'
import { Z_BLOCK } from 'zlib';

class TermsConditions extends Component {
  constructor(props) {
    super(props)
    if (sessionManager.isLoggedIn()) {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: true, username: username, userId: userId, token: token }
    } else {
      var username = sessionManager.getUsername()
      var userId = sessionManager.getUserId()
      var token = sessionManager.getToken()
      this.state = { loggedIn: false, username: "", userId: 0, token: "" }
    }
  }

  componentDidMount() {
    document.querySelector("body").classList.add("has-navbar-fixed-top")
  }

  render() {
      return (
        <Layout loggedIn={this.state.loggedIn} username={this.state.username} showFooter={true}>
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column auto">
                    </div>
                    <div className="column is-three-quarters">
                        <div className="box">
                            <div className="tile is-ancestor">
                                <div className="tile is-vertical">
                                    <div className="tile">
                                        <div className="tile is-parent has-text-justified">
                                            <article className="tile is-child is-info">
                                            <p className="title has-text-centered">Terms and Conditions</p>
                    <br></br>
                    <p className="subtitle">1. Acknowledgment.
Please read carefully the following provisions of this TERMS OF USE (“TERMS OF USE”). This is a legal agreement between you and Fluent regarding the use of the Fluent software programs and related documentation being installed by you on your device (the “Software”). By downloading the Software and/or using any of the services enabled by the Software (the “Services”), YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THE FOLLOWING TERMS AND CONDITIONS (INCLUDING ANY ADDITIONAL GUIDELINES AND FUTURE MODIFICATIONS) AND BY Fluent’s PRIVACY POLICY, WHICH IS INCORPORATED HEREIN BY REFERENCE AND CAN BE FOUND AT fluent.id/privacy. IF AT ANY TIME YOU DO NOT AGREE TO THESE TERMS AND CONDITIONS OF USE, YOU MAY NOT USE THE SOFTWARE OR SERVICES AND MUST IMMEDIATELY TERMINATE YOUR USE OF THE SOFTWARE AND ALL SERVICES. If you do not accept and agree to be bound by all of the terms of this Agreement, please do not use the Service.
</p>
<p className="subtitle">
2. License Grant.
Subject to your compliance with the terms and conditions set out in this Terms of Use, Fluent grants you a personal, limited, non-commercial, non-exclusive, non-sublicensable, non-assignable, revocable license to download, install and use one (1) copy of the Software in object code format, only on your personal computer or mobile device (the “Device”) for the sole purpose of personally using the Fluent application and any other applications that may be explicitly authorized by Fluent for use through the use of the Software.
</p>
<p className="subtitle">
3. Ownership.
The Software is protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties. The Software includes trade secrets and information that is confidential and proprietary to Fluent and you agree to take all necessary actions to protect the confidentiality of such information. All ownership rights in the Software and Services, including any related documentation and any new releases, modifications, and enhancements thereto belong solely to Fluent and its licensors, if any, including all intellectual property rights therein. The Software is licensed, not sold. Title does not pass to you. There is no implied license, right or interest granted in any copyright, patent, trade secret, trademark, invention or other intellectual property rights. Fluent hereby expressly reserves all rights in the Software and all Services which are not expressly granted to you hereunder.

</p>
<p className="subtitle">
4. Restrictions.
You only obtain a license to use the object code version of the Software. You shall not (i) copy, modify, adapt, translate into any language, distribute, or create derivative works based on the Software or any of the Services; (ii) sublicense, sublease, lease, lend, assign, sell, license, distribute, rent, export, re-export or grant other rights in the Software or Service and any attempt by you to take such action shall be void; (iii) decompile, disassemble, reverse engineer, or attempt to reconstruct, identify, or discover any source code, underlying ideas, underlying user interface techniques, or algorithms of the Software or any of the Services by any means whatsoever; (iv) remove, obscure or alter any copyright and/or other proprietary notices contained on or in or otherwise connected to the Software or any of the Services; (v) use the Software or any of the Services to create or proliferate a virus or to circumvent any copy protection or other digital rights management mechanism.

</p>
<p className="subtitle">5. Additional Restrictions.
You further represent that you shall not (i) use the Software or any of the Services for any illegal or unauthorized purpose, (ii) use the Software or any of the Services in any manner which could damage, disable, overburden or impair any of the Services, (iii) transmit worms, viruses or any code of a destructive nature, (iv) display, transmit or share any content consisting of text, sounds, audio, pictures, photos, video and/or any type of materials, information or communications (“Content”) deemed hateful, threatening, pornographic, obscene, abusive, racially or ethnically offensive, libelous or defamatory, or any Content that encourages conduct that would be considered a criminal offense or bring forth civil liability, (v) attempt to hack, destabilize or adapt Fluent’s website, the Software (or its source code) or any of the Services, or alter another website so as to falsely imply that it is affiliated with Fluent, or (vi) use or access any of the Services by any means other than through the interface provided by Fluent.
</p>
<p className="subtitle">6. Your Utilization of Your Device:
If your use of the Software or Services is dependent upon the use of bandwidth owned or controlled by a third party, you acknowledge and agree that your license to use the Software is subject to you obtaining consent from the relevant third party for such use and by using the Software you warrant that you have obtained such consent. In addition, you warrant that you own the Device to which you are downloading the Software, or that you have the legal right to control the use of that Device. You further agree to ensure that any other person whom you permit to use the Software or Services will do so in accordance with this Terms of Use. You must delete any Software from the Device if you sell the Device, or if you cease to have the legal right to control the use of the Device.

</p>
<p className="subtitle">
7. Content.
Content transmitted by the use of the Software and Services is entirely the responsibility of the person from whom such Content originated. You use the Software and Services at your own risk and understand that by using the Software or any of the Services, you may be exposed to Content that is offensive, harmful to minors, indecent or otherwise objectionable. Fluent does not endorse any Content and expressly disclaims any and all liability in connection with any and all Content transmitted or displayed using the Software and/or Services. You hereby release and discharge the Fluent Parties from any and all claims and demands arising out of or relating to any Content.

</p>
<p className="subtitle">8. Your Content.
You acknowledge and agree that you are solely responsible for any Content that you transmit or display through the Software or Services and that Fluent is not responsible to you or any third party in connection with any Content. You further agree to pay for all royalties, fees, and any other monies owing any person by reason of any of your Content. In addition, you represent and warrant that: (a) you are the creator and owner of or have the necessary rights to transmit or display the Content; and (b) the Content you transmit or you display does not and will not: (i) infringe, violate, or misappropriate any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right, or (ii) slander, defame, libel, or invade the right of privacy, publicity or other property rights of any other person. VIOLATORS OF THESE THIRD-PARTY RIGHTS MAY BE SUBJECT TO CRIMINAL AND CIVIL LIABILITY. Fluent RESERVES ALL RIGHTS AND REMEDIES AGAINST ANYONE WHO VIOLATES ANY OF THE PROVISIONS OF THIS TERMS OF USE.

</p>
<p className="subtitle">9. Third Parties.
The Software may be incorporated into, and may incorporate itself, software and other technology owned and controlled by third parties. Any such third party software or technology that is incorporated in the Software falls under the scope of this Agreement.

</p>
<p className="subtitle">10. New Versions of the Software.
Fluent, in its sole discretion, reserves the right to add additional features or functions, or to modify or provide programming fixes, updates and upgrades to the Software or Services. Fluent has no obligation to make available to you any additional features or functions or any modifications, updates, support, maintenance or subsequent versions of the Software or any of the Services. You may have to agree to a renewed version of Terms of Use in the event you want to download, install or use any additional features or functions or any modifications, updates or new versions of the Software. You acknowledge that Fluent may automatically issue any additional features or functions or modifications, updates or upgraded versions of the Software and, accordingly, may modify, update or upgrade the version of the Software that you are using or have installed on your Device. You hereby agree that your Device may automatically request and/or receive such modifications, upgrades or updates.

</p>
<p className="subtitle">11. Third Party Fees.
For particular Devices, Fluent may ask your permission to use your native SMS application to deliver messages or invitations to people who are not registered users of the Services and with whom you choose to communicate. Some of these services may charge additional fees. These fees and any third party fees will be paid by you.

</p>
<p className="subtitle">12. Eligibility.
The license to use the Software and Services is not valid in any jurisdiction where prohibited. The Software and Services are intended solely for users who are seven (7) years of age or older, and any registration, use or access to the Software or Services by anyone under 7 is unauthorized, unlicensed, and in violation of this Terms of Use. Fluent may terminate your account, delete any content or information that you have posted on the Services, and/or prohibit you from using or accessing the Software or Services (or any portion, aspect or feature of the Services) for any reason or for no reason, at any time in its sole discretion, with or without notice, including without limitation if it believes that you are under 7. If you are under 18 years of age you may use the Software and Services only if you either are an emancipated minor, or possess legal parental or guardian consent, and are fully able and competent to enter into and abide by the provisions set forth in this Terms of Use.

</p>
<p className="subtitle">13. No Access to Emergency Services.
The Software and Services are not intended to support or carry emergency calls to any type of hospitals, law enforcement agencies, medical care unit or any other kind of services that connect a user to emergency services personnel or public safety answering points pursuant to applicable local and or national regulatory requirements (“Emergency Services”). There are important differences between traditional telephone services and the Software and Services. You acknowledge and agree that: (i) Fluent is not required to offer access to Emergency Services under any applicable local and/or national rules, regulations or law; (ii) it is your responsibility to purchase, separately from the Software, traditional wireless (cellular) or fixed line telephone services that offer access to Emergency Services, and (iii) Fluent is not a replacement for your primary telephone service.
</p>
<p className="subtitle">14. Prevention of Unauthorized Use.
Fluent reserves the right to exercise whatever lawful means it deems necessary to prevent unauthorized use of the Software or Services, including, but not limited to, technological barriers, IP mapping, and directly contacting your wireless (cellular) carrier regarding such unauthorized use.
</p>
<p className="subtitle">15. License Grant to Fluent.
You hereby authorize Fluent to collect and use the address books, contact lists, and unique phone identifiers (IMEI, UDID, or other) contained in the Devices to which you have downloaded the Software for purposes of your use of the Services.
</p>
<p className="subtitle">16. Premium and all kind of paid contents & item Services.
From time to time, Fluent may provide additional features and/or Services that you pay for (“Premium and all kind of paid contents & item Services”). Fluent may also offer from time to time in its sole discretion, certain Premium and all kind of paid contents & item Services for free, whether for a trial period or otherwise. Unless expressly stated otherwise, references in this Terms of Use to the Services include the Premium and all kind of paid contents & item Services.
</p>
<p className="subtitle">17. Prohibited Activities
Fluent reserves the right to investigate, suspend and/or terminate your account if you have misused the Service or behaved in a way Fluent regards as inappropriate or unlawful, including actions or communications occur off the Service but involve users you meet through the Service. The following is a partial list of the type of actions that you may not engage in with respect to the Service. You will not:
use abusive language
post or transmit objectionable content
impersonate any person or entity.
solicit money from any users.
post any Content that is prohibited.
"stalk" or otherwise harass any person.
express or imply that any statements you make are endorsed by Fluent without our specific prior written consent.
use the Service in an illegal manner or to commit an illegal act.
access the Service in a jurisdiction in which it is illegal or unauthorized.
use any robot, spider, site search/retrieval application, or other manual or automatic device or process to retrieve, index, "data mine", or in any way reproduce or circumvent the navigational structure or presentation of the Service or its contents.
collect usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email or unauthorized framing of or linking to the Service.
interfere with or disrupt the Service or servers or networks connected to the Service.
transmit any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment.
forge headers or otherwise manipulate identifiers in order to disguise the origin of any information transmitted to or through the Service (either directly or indirectly through the use of third party software).
"frame" or "mirror" any part of the Service, without Fluent’s prior written authorization.
use meta tags or code or other devices containing any reference to Fluent or the Service (or any trademark, trade name, service mark, logo or slogan of Fluent) to direct any person to any other website for any purpose.
modify, adapt, sublicense, translate, sell, reverse engineer, decipher, decompile or otherwise disassemble any portion of the Service any software used on or for the Service, or cause others to do so.
post, use, transmit or distribute, directly or indirectly, (e.g. screen scrape) in any manner or media any content or information obtained from the Service other than solely in connection with your use of the Service in accordance with this Agreement.
</p>
<p className="subtitle">18. Payments for Premium and all kind of paid contents & item Services.
The Premium and all kind of paid contents & item Services may be offered on a subscription basis, per usage basis or as otherwise described at the time of your purchase, and may be payable in advance, in arrears, per usage, or as otherwise described at the time of your purchase. If you purchase any Premium and all kind of paid contents & item Services, you hereby agree to pay all charges to your account, including applicable taxes, in accordance with billing terms in effect at the time the charges are payable and whether charged by Fluent or the online application store from which you downloaded the Software (the “Application Store”). You agree to abide by any relevant terms of service or other legal agreement that governs your use of a given payment processing service and/or method. If you purchase Premium and all kind of paid contents & item Services on a subscription basis, you acknowledge and agree that this is a recurring payment and payments shall be made by the payment method and payment intervals you have selected, until the subscription for the Premium and all kind of paid contents & item Services is terminated. You agree that if you purchase Premium and all kind of paid contents & item Services through an Application Store, all payment related questions, issues, disagreements and/or disputes shall be handled in accordance with the terms of service or other legal agreement that governs your use of a given payment processing service and/or method, and in no event will Fluent have any responsibility in connection with any of the foregoing.
 
</p>
<p className="subtitle">19.Termination by You.
You may terminate your use of the Services at any time by uninstalling and deleting the Software from all of your Devices. If you have subscribed to any Premium and all kind of paid contents & item Services, you agree that you are solely responsible for directly terminating all payment obligations you may have with any Application Store and/or payment processing service in connection with the Premium and all kind of paid contents & item Services.
</p>
<p className="subtitle">20. Termination by Fluent.
Without limiting any other remedies, Fluent may limit, suspend, discontinue or terminate this Terms of Use and/or your use of all or any part of the Software and/or Services, with immediate effect, automatically, with or without notice and without recourse to the courts, for any reason or for no reason, including without limitation if Fluent believes that you are (i) in breach of any of the terms of this Terms of Use, (ii) creating problems or legal liabilities (actual or potential), (iii) delinquent with respect to any charges due for a Premium and all kind of paid contents & item Service, (iv) infringing a third party’s intellectual property rights, or (v) engaging in fraudulent, immoral or illegal activities. You agree that Fluent is under no obligation to provide the Services, including without limitation any Premium and all kind of paid contents & item Services, and that no Fluent Party shall be liable to you or to any other party for any limitation, suspension, discontinuance, termination or modification of the Software and/or any of the Services.
</p>
<p className="subtitle">21. Storage of Content.
Subject to the terms and conditions of this Terms of Use, Fluent will use reasonable efforts to store your Content, if any, in connection with your use of a Premium and all kind of paid contents & item Service if such storage is a feature provided with the Premium and all kind of paid contents & item Service. You acknowledge and agree that Fluent shall have no responsibility for the loss, deletion, or destruction of any Content, including any stored Content and that no Fluent Party is under any obligation to preserve, provide access to or return to you any Content. In addition, you further acknowledge and agree that, if you have elected to use a Premium and all kind of paid contents & item Service that includes the storage of Content and you are not active on the Premium and all kind of paid contents & item Service for thirty (30) days or longer (as determined by Fluent), Fluent may delete your Content for any reason, including technical, business or any other reasons.
</p>
<p className="subtitle">22. Third-Party Sites, Products and Services; Links.
The Services may include links or references to other web sites or services solely as a convenience to our users (“Reference Sites“). Fluent does not endorse any such Reference Sites. ACCESS AND USE OF REFERENCE SITES, INCLUDING THE INFORMATION, MATERIALS, PRODUCTS, AND SERVICES ON OR AVAILABLE THROUGH REFERENCE SITES IS SOLELY AT YOUR OWN RISK. We encourage you to be aware of when you leave the Services, and to read the terms and conditions and privacy policy of any third-party website or service that you visit. In addition, your correspondence or business dealings with advertisers found on or through the Services are solely between you and such advertiser.
</p>
<p className="subtitle">23. Indemnification.
"YOU HEREBY AGREE TO INDEMNIFY, DEFEND AND HOLD HARMLESS, Fluent, ITS LICENSORS, ITS PARTNERS, AND ITS AND THEIR RESPECTIVE AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS AND SUPPLIERS (INCLUDING Fluent, COLLECTIVELY THE “Fluent PARTIES”), FROM AND AGAINST ANY AND ALL CLAIMS, ACTIONS, LIABILITY, DAMAGES AND COSTS, INCLUDING REASONABLE ATTORNEYS’ FEES INCURRED BY SUCH PARTIES, IN CONNECTION WITH OR ARISING OUT OF (A) YOUR VIOLATION OR BREACH OF ANY TERM OF THIS TERMS OF USE OR ANY APPLICABLE LAW OR REGULATION, WHETHER OR NOT REFERENCED HEREIN, OR (B) YOUR VIOLATION OF ANY RIGHTS OF ANY THIRD PARTY, OR (C) YOUR USE OR MISUSE OF THE SOFTWARE AND/OR ANY OF THE SERVICES, OR (D) YOUR CONTENT OR OTHER COMMUNICATION DISPLAYED OR TRANSMITTED BY MEANS OF THE SOFTWARE AND/OR ANY OF THE SERVICES, OR (E) ANY TAXES RELATED TO YOUR PURCHASE AND/OR USE OF ANY OF THE SERVICES (OTHER THAN TAXES BASED ON THE INCOME OF Fluent). If you downloaded the Software from the the app marketplaces, you acknowledge that, in the event of any third party claim that the Software or Services or your possession and use of the Software or Services infringes any third party’s intellectual property rights, as between Fluent and the app marketplaces, Fluent, not the app marketplaces, will be solely responsible for the investigation, defense, settlement and discharge of any such intellectual property infringement claim. Fluent reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify Fluent, and you agree to cooperate with Fluent defense of these claims. You agree not to settle any matter without the prior written consent of Fluent. "
</p>
<p className="subtitle">24. Assignment.
You are not allowed to assign this Terms of Use or any rights or obligations hereunder. Fluent is allowed at its sole discretion to assign this Terms of Use and any rights hereunder to any third party, without giving notice.
</p>
<p className="subtitle">25. No Warranty.
The Software and Services are provided to you “AS IS” and “AS AVAILABLE” with no warranties. The Fluent Parties hereby disclaim all warranties, terms, or conditions, express or implied, either in fact or by operation of law, statutory or otherwise, including, without limitation, warranties, terms or conditions of merchantability, fitness for a particular purpose, satisfactory quality, correspondence with description, title, non-infringement, and accuracy of the information generated. ACCORDINGLY, YOU ACKNOWLEDGE AND AGREE THAT THE Fluent PARTIES (AND IF YOU DOWNLOADED THE SOFTWARE FROM THE APP STORE OR GOOGLE PLAY, APPLE OR GOOGLE) WILL HAVE NO LIABILITY IN CONNECTION WITH OR ARISING FROM YOUR USE OF THE SOFTWARE AND/OR ANY OF THE SERVICES. YOUR ONLY RIGHT OR REMEDY WITH RESPECT TO ANY PROBLEMS OR DISSATISFACTION WITH THE SOFTWARE AND/OR ANY OF THE SERVICES IS TO IMMEDIATELY UNINSTALL THE SOFTWARE AND CEASE USE OF THE SOFTWARE AND ALL SERVICES. You further acknowledge that the Fluent Parties (and if you downloaded the Software from the App Store or Google Play, Apple or Google) have no obligation whatsoever to furnish any maintenance or support services with respect to the Software and/or Services.
</p>
<p className="subtitle">26. NO WARRANTIES.
THE Fluent PARTIES DO NOT WARRANT THAT THE CONTENT DISPLAYED OR TRANSMITTED ON OR THROUGH ANY OF THE SERVICES WILL BE UNINTERRUPTED, OR FREE OF ERRORS, VIRUSES OR OTHER HARMFUL COMPONENTS, AND DO NOT WARRANT THAT ANY OF THE FOREGOING WILL BE CORRECTED. THE Fluent PARTIES DO NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OF, OR THE RESULTS FROM THE USE OF, THE SOFTWARE OR SERVICES.
</p>
<p className="subtitle">27. HARM TO YOUR DEVICE.
YOU UNDERSTAND AND AGREE THAT YOU TRANSMIT, DISPLAY OR RECEIVE CONTENT THROUGH THE SERVICE AT YOUR OWN DISCRETION AND RISK AND THAT YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR PROPERTY (INCLUDING YOUR DEVICE AND COMPUTER SYSTEM) OR LOSS OF DATA THAT RESULTS FROM SUCH CONTENT.
</p>
<p className="subtitle">28. LIMITATION OF LIABILITY.
IN NO EVENT SHALL THE Fluent PARTIES BE LIABLE, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, FOR ANY LOSSES, LIABILITIES, CLAIMS OR DAMAGES OF ANY KIND, WHETHER DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR PUNITIVE, OR FOR LOSS OF REVENUE OR PROFITS, LOSS OF BUSINESS, OR ANY OTHER DAMAGES, ARISING OUT OF OR IN CONNECTION WITH THE SOFTWARE AND/OR ANY OF THE SERVICES, THIS TERMS OF USE OR THE PERFORMANCE, SUSPENSION, TERMINATION OR BREACH HEREOF, EVEN IF Fluent OR ANY OTHER Fluent PARTY HAS BEEN ADVISED OF THE POSSIBILITY THEREOF. THE Fluent PARTIES SHALL HAVE NO LIABILITY IN CONNECTION WITH OR ARISING FROM THIS TERMS OF USE OR USE OF THE SOFTWARE OR ANY OF THE SERVICES. The foregoing limitations will apply even if the above stated remedy fails of its essential purpose. As some jurisdictions do not allow some of the exclusions or limitations set forth above, some of these exclusions or limitations may not apply to you. In such event the liability of the Fluent Parties will be limited to the maximum extent possible under applicable law. THESE LIMITATIONS OF LIABILITY ALSO APPLY WITH RESPECT TO DAMAGES INCURRED BY YOU BY REASON OF ANY PRODUCTS OR SERVICES SOLD OR PROVIDED BY THIRD PARTIES OTHER THAN Fluent AND RECEIVED THROUGH OR ADVERTISED ON ANY OF THE SERVICES.
</p>
<p className="subtitle">29. CLAIMS.
YOU AND Fluent AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO ANY OF THE SERVICES OR SOFTWARE MUST COMMENCE WITHIN ONE (1) MONTH AFTER THE CAUSE OF ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED. If you downloaded the Software from the app marketplaces, you further acknowledge that the app marketplaces has no responsibility for addressing any claims relating to the Software or Services or your possession and/or use of the Software or Services, including, but not limited to: (i) product liability claims; (ii) any claim that the Software or Services fails to conform to any applicable legal or regulatory requirement; and (iii) claims arising under consumer protection or similar legislation.
</p>
<p className="subtitle">30. BASIS OF THE BARGAIN.
YOU ACKNOWLEDGE AND AGREE THAT Fluent HAS OFFERED ITS SOFTWARE AND SERVICES AND SET ITS PRICES IN RELIANCE UPON THE WARRANTY DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH HEREIN, THAT THE WARRANTY DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH HEREIN REFLECT A REASONABLE AND FAIR ALLOCATION OF RISK BETWEEN YOU AND Fluent, AND THAT THE WARRANTY DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH HEREIN FORM AN ESSENTIAL BASIS OF THE BARGAIN BETWEEN YOU AND Fluent. Fluent WOULD NOT BE ABLE TO PROVIDE THE SOFTWARE OR SERVICES TO YOU ON AN ECONOMICALLY REASONABLE BASIS WITHOUT THESE LIMITATIONS.
</p>
<p className="subtitle">31. Feedback.
Any comments, suggestions, or feedback relating to the Software or any of the Services (“Feedback“) submitted to Fluent shall become the property of Fluent. Fluent will have exclusive ownership of all rights to the Feedback. Fluent will be entitled to use the Feedback for any commercial or other purpose whatsoever, without any compensation to you or any other person. Fluent will not be required to treat any Feedback as confidential. You agree that you do not acquire any right in or to the Software or any of the Services (or any changes, modifications or corrections thereto) by virtue of any Feedback. You acknowledge that you are responsible for whatever material is submitted by you, including its legality, reliability, appropriateness, originality, and copyright.
</p>
<p className="subtitle">32. GENERAL.
</p>
<p className="subtitle">32.1 Notices.
Fluent may provide you with notices, including those regarding changes to terms and conditions, by email, or postings on the Fluent website. Notice will be deemed given twenty-four (24) hours after email is sent, unless Fluent is notified that the email address is invalid. Notice posted on the Fluent website is deemed given one (1) day following the initial posting. Fluent reserves the right to determine the form and means of providing notifications to our users.
</p>
<p className="subtitle">32.2 Amendments.
Fluent reserves the right to amend this Terms of Use at any time by publishing the revised Terms of Use on the Fluent website or by otherwise providing notice of such amendment pursuant to the notice provisions above. The revised Terms of Use shall become effective following the applicable notice period, unless you expressly accept the revised Terms of Use earlier by clicking on the accept button. Your express acceptance or continued use of the Software or Services after the applicable notice period shall constitute your acceptance to be bound by the terms and conditions of the revised Terms of Use. 
</p>
<p className="subtitle">32.3 Ability to Contract.
You hereby affirm that you are fully able and competent to enter into the terms, conditions, obligations, affirmations, representations and warranties set forth in this Terms of Use, and to abide by and comply with the terms and conditions of this Terms of Use.
</p>
<p className="subtitle">32.4 Entire Agreement.
This Terms of Use represents the complete agreement concerning the matters covered and, except as set forth under Amendments above, may be amended only by a writing executed by both parties. If any provision of this Terms of Use is held to be unenforceable, such provision shall be modified only to the extent necessary to make it enforceable and shall not affect the enforceability or validity of the remaining provisions, which shall remain in full force and effect.
</p>
<p className="subtitle">32.5 Waiver.
The failure of Fluent to exercise or enforce any right or provision of this Terms of Use will not constitute a waiver of such right or provision. Any waiver of any provision of this Terms of Use will be effective only if in writing and signed by Fluent.
</p>
<p className="subtitle">32.6 Headings.
The heading references herein are for convenience purposes only, do not constitute a part of this Terms of Use, and will not be deemed to limit or affect any of the provisions hereof.
</p>
<p className="subtitle">32.7 Injunctive Relief.
You acknowledge that the obligations made hereunder to Fluent are of a unique and irreplaceable nature, the loss of which shall irreparably harm Fluent and which cannot be replaced by monetary damages alone so that Fluent shall be entitled to injunctive or other equitable relief (without the obligations of posting any bond or surety) in the event of any breach or anticipatory breach by you. You irrevocably waive all rights to seek injunctive or other equitable relief.
</p>
<p className="subtitle">32.8 Third Party Beneficiaries and Agreements.
If you downloaded the Software from the app marketplaces, you acknowledge and agree that the app marketplaces are third party beneficiaries of this License Agreement, and that, upon your acceptance of the terms and conditions of this Terms of Use, the app marketplaces will have the right (and will be deemed to have accepted the right) to enforce this Terms of Use against you as a third party beneficiary hereof. You agree to comply with, and your license to use the Software and Services is conditioned upon your compliance with, all applicable third-party terms of agreement, including those of any Application Store, as may be applicable, when using the Software and/or Services.
</p>
<p className="subtitle">32.9 Mobile Alerts and Opt Out.
Fluent may use carrier distributed mobile messaging (SMS) to verify ownership of a registered mobile phone number.
</p>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column auto">
                    </div>
                </div>
            </div>
            </section>
      </Layout>
      )
  }
}

export default TermsConditions