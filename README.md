<div align="center" style="padding: 20px 0 0 0; box-shadow: 2px 2px; background-color: rgb(41, 142, 103);">
  <a href="https://informed.iq/" rel="noopener" target="_blank" >
    <img width="200" src="https://user-images.githubusercontent.com/13334788/83625127-86064980-a5a4-11ea-919a-3d6ee3e17a89.png" alt="verify-iq">
  </a>
  <h1 align="center">VerifyIQ SDK</h1>
</div>

![Release NPM](https://github.com/Informed/verifyiq-sdk/workflows/Release%20NPM/badge.svg)
![Test](https://github.com/Informed/verifyiq-sdk/workflows/Test/badge.svg)
![Deps](https://img.shields.io/david/dev/Informed/verifyiq-sdk?label=dependencies)
![NPM](https://img.shields.io/npm/v/@informed-iq/verify-iq-sdk)
![Downloads](https://img.shields.io/npm/dw/@informed-iq/verify-iq-sdk)
![Size](https://img.shields.io/bundlephobia/min/@informed-iq/verify-iq-sdk)
![License](https://img.shields.io/npm/l/@informed-iq/verify-iq-sdk)
![contrib](https://img.shields.io/github/contributors/Informed/verifyiq-sdk?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Getting started

To install latest version

```sh
$ yarn add @informed-iq/verify-iq-sdk
```

## Usage

#### Simplest way

**1. Instantiate SDK**

```js
const viq = new VerifyIQ({
  authToken: 'Basic jcA897afas91jajk2…'
  environment: VerifyIQ.Staging,

  actionCallbackWebhookUrl: actionNotificationEndpointUrl,

  onPass: (actionObject, reason) => {},
  onIncomplete: (actionObject, reason) => {},
  onWaive: (actionObject, reason) => {},
  onLoad: (payload) => {},
});
```

**2. Add root DOM element in the HTML**

```html
<div id="verify-iq-root"></div>
```

**4. Render VerifyIQ in the given DOM element**

```js
const verifyIQRoot = document.querySelector("#verify-iq-root");
viq.renderApplicationId({verifyIQRoot, applicationId, applicant, stipulation});
```

## Constants

### Environment

Accessible as **`VerifyIQ.<Env>`**;

### StipulationTypes

Accessible as **`VerifyIQ.StipulationTypes`**;

| StipulationTypes                        | Description                                                         |
| --------------------------------------- | --------------------------------------------------------------------|
| Income                                  | Set the stipulation type to Income                                  |  
| ContractCancellationOption              | Set the stipulation type to ContractCancellationOption              |          
| Residence                               | Set the stipulation type to Residence                               |
| PurchaseOrder                           | Set the stipulation type to PurchaseOrder                           |
| Identity                                | Set the stipulation type to Identity                                |
| PaidAccount                             | Set the stipulation type to PaidAccount                             |
| Insurance                               | Set the stipulation type to Insurance                               |
| Trade                                   | Set the stipulation type to Trade                                   |
| Title                                   | Set the stipulation type to Title                                   |
| MortgageCurrent                         | Set the stipulation type to MortgageCurrent                         | 
| Registration                            | Set the stipulation type to Registration                            |
| NonOfficerResolutionRequired            | Set the stipulation type to NonOfficerResolutionRequired            |               
| VehicleImages                           | Set the stipulation type to VehicleImages                           |
| BankruptcyDischarged                    | Set the stipulation type to BankruptcyDischarged                    | 
| CreditApplication                       | Set the stipulation type to CreditApplication                       |
| NonBureauCredit                         | Set the stipulation type to NonBureauCredit                         |
| CreditApproval                          | Set the stipulation type to CreditApproval                          |
| TaxLienSatisfied                        | Set the stipulation type to TaxLienSatisfied                        |
| CreditScoreDisclosureException          | Set the stipulation type to CreditScoreDisclosureException          |                   
| ChildSupportPaidAndCurrent              | Set the stipulation type to ChildSupportPaidAndCurrent              |         
| RetailInstallmentSalesContract          | Set the stipulation type to RetailInstallmentSalesContract          |                 
| Rent                                    | Set the stipulation type to Rent                                    | 
| CosignerNotice                          | Set the stipulation type to CosignerNotice                          |
| ArticlesOfIncorporation                 | Set the stipulation type to ArticlesOfIncorporation                 |    
| OdometerStatement                       | Set the stipulation type to OdometerStatement                       |
| ExecutedCrossCollateralDefaultAgreement | Set the stipulation type to ExecutedCrossCollateralDefaultAgreement |                                   
| ForeignLanguageAcknowledgement          | Set the stipulation type to ForeignLanguageAcknowledgement          |
| ExecutedGuarantyAgreement               | Set the stipulation type to ExecutedGuarantyAgreement               |
| BookoutSheet                            | Set the stipulation type to BookoutSheet                            | 
| AppearanceProtection                    | Set the stipulation type to AppearanceProtection                    | 
| GapWaiverContract                       | Set the stipulation type to GapWaiverContract                       |
| BookoutPdf                              | Set the stipulation type to BookoutPdf                              |
| VehicleServiceContract                  | Set the stipulation type to VehicleServiceContract                  |
| ContractAddendum                        | Set the stipulation type to ContractAddendum                        | 
| CreditLifeDisabilityContract            | Set the stipulation type to CreditLifeDisabilityContract            |
| CpoCertificate                          | Set the stipulation type to CpoCertificate                          |
| LienPerfection                          | Set the stipulation type to LienPerfection                          |
| DisclosureForm                          | Set the stipulation type to DisclosureForm                          |
| PowerOfAttorney                         | Set the stipulation type to PowerOfAttorney                         |
| DocFeeDisclosureForm                    | Set the stipulation type to DocFeeDisclosureForm                    |
| LeaseContract                           | Set the stipulation type to LeaseContract                           |
| EmergencyRoadsideAssist                 | Set the stipulation type to EmergencyRoadsideAssist                 | 
| PayoffRelease                           | Set the stipulation type to PayoffRelease                           |
| EmergencyTravelAssist                   | Set the stipulation type to EmergencyTravelAssist                   |
| AcknowledgementOfRewrittenContract      | Set the stipulation type to AcknowledgementOfRewrittenContract      |
| Etch                                    | Set the stipulation type to Etch                                    | 
| OrderForm                               | Set the stipulation type to OrderForm                               |
| ExcessWearAndTear                       | Set the stipulation type to ExcessWearAndTear                       |
| SSN                                     | Set the stipulation type to SSN                                     |
| FaxCoverSheet                           | Set the stipulation type to FaxCoverSheet                           | 
| Phone                                   | Set the stipulation type to Phone                                   |
| GapDisclosureAddendum                   | Set the stipulation type to GapDisclosureAddendum                   |
| AutomaticACHWithdrawal                  | Set the stipulation type to AutomaticACHWithdrawal                  | 
| HailDamageDocument                      | Set the stipulation type to HailDamageDocument                      |
| Miscellaneous                           | Set the stipulation type to Miscellaneous                           |
| Invoice                                 | Set the stipulation type to Invoice                                 |
| KeyReplacement                          | Set the stipulation type to KeyReplacement                          |
| ElectronicConsent                       | Set the stipulation type to ElectronicConsent                       |
| LemonLaw                                | Set the stipulation type to LemonLaw                                |
| CancellationAgreement                   | Set the stipulation type to CancellationAgreement                   |
| MailedAaNotice                          | Set the stipulation type to MailedAaNotice                          | 
| ReportOfSale                            | Set the stipulation type to ReportOfSale                            |
| MaintenanceWorksheet                    | Set the stipulation type to MaintenanceWorksheet                    |
| CreditReport                            | Set the stipulation type to CreditReport                            |
| Ofac                                    | Set the stipulation type to Ofac                                    | 
| GuaranteeOfTitle                        | Set the stipulation type to GuaranteeOfTitle                        |   
| PaintlessDentRepair                     | Set the stipulation type to PaintlessDentRepair                     |  
| AgreementToContact                      | Set the stipulation type to AgreementToContact                      | 
| TheftProtection                         | Set the stipulation type to TheftProtection                         | 
| NegativeEquityForm                      | Set the stipulation type to NegativeEquityForm                      |
| TheftRecoverySystem                     | Set the stipulation type to TheftRecoverySystem                     |
| TitleApplication                        | Set the stipulation type to TitleApplication                        |
| TireWheel                               | Set the stipulation type to TireWheel                               | 
| VerificationOfEmployment                | Set the stipulation type to VerificationOfEmployment                |
| TotalLossProtectionAssurance            | Set the stipulation type to TotalLossProtectionAssurance            | 

### ApplicantTypes

Accessible as **`VerifyIQ.ApplicantTypes`**;

| ApplicantTypes   | Description                                |
| ---------------- | ------------------------------------------ |
| PrimaryApplicant | Set the applicant type to PrimaryApplicant |
| CoApplicant      | Set the applicant type to CoApplicant      |

### EventTypes

Accessible as **`VerifyIQ.<Event>`**;

| Event      | Description                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------- |
| Loaded     | Event represents VerifyIQ loaded event and will trigger on first contentful paint             |
| Pass       | Event represents VerifyIQ pass event and will trigger on verification pass action             |
| Incomplete | Event represents VerifyIQ incomplete event and will trigger on verification incomplete action |
| Waive      | Event represents VerifyIQ waive event and will trigger on verification waive action           |
