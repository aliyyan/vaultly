import docusign from 'docusign-esign';

// DocuSign configuration
const DOCUSIGN_INTEGRATION_KEY = process.env.DOCUSIGN_INTEGRATION_KEY;
const DOCUSIGN_USER_ID = process.env.DOCUSIGN_USER_ID;
const DOCUSIGN_ACCOUNT_ID = process.env.DOCUSIGN_ACCOUNT_ID;
const DOCUSIGN_BASE_PATH = process.env.DOCUSIGN_BASE_PATH || 'https://demo.docusign.net/restapi'; // Sandbox

class DocuSignService {
  constructor() {
    this.apiClient = new docusign.ApiClient();
    this.apiClient.setBasePath(DOCUSIGN_BASE_PATH);
    this.apiClient.addDefaultHeader('Authorization', 'Bearer ' + this.getAccessToken());
  }

  async getAccessToken() {
    // This would typically use OAuth2 flow
    // For now, using a JWT token (you'll need to implement OAuth)
    return process.env.DOCUSIGN_ACCESS_TOKEN;
  }

  async createEnvelope(applicationData) {
    const {
      firstName,
      lastName,
      email,
      phone,
      assetType,
      requestedAmount
    } = applicationData;

    // Create the envelope definition
    const envelopeDefinition = new docusign.EnvelopeDefinition();
    envelopeDefinition.emailSubject = 'Vaultly Asset Funding Agreement - Please Sign';
    envelopeDefinition.emailBlurb = 'Please review and sign your asset funding agreement.';

    // Create document from your legal agreement template
    const document = new docusign.Document();
    document.documentBase64 = await this.getPDFTemplate(); // Your legal PDF
    document.name = 'Vaultly Funding Agreement';
    document.fileExtension = 'pdf';
    document.documentId = '1';

    // Create the signer
    const signer = new docusign.Signer();
    signer.email = email;
    signer.name = `${firstName} ${lastName}`;
    signer.recipientId = '1';
    signer.routingOrder = '1';

    // Add form fields/tabs
    const signHere = new docusign.SignHere();
    signHere.documentId = '1';
    signHere.pageNumber = '1';
    signHere.recipientId = '1';
    signHere.tabLabel = 'SignHereTab';
    signHere.xPosition = '100';
    signHere.yPosition = '100';

    const nameField = new docusign.Text();
    nameField.documentId = '1';
    nameField.pageNumber = '1';
    nameField.recipientId = '1';
    nameField.tabLabel = 'FullName';
    nameField.xPosition = '100';
    nameField.yPosition = '200';
    nameField.value = `${firstName} ${lastName}`;

    const emailField = new docusign.Email();
    emailField.documentId = '1';
    emailField.pageNumber = '1';
    emailField.recipientId = '1';
    emailField.tabLabel = 'Email';
    emailField.xPosition = '100';
    emailField.yPosition = '250';
    emailField.value = email;

    // Add tabs to signer
    signer.tabs = new docusign.Tabs();
    signer.tabs.signHereTabs = [signHere];
    signer.tabs.textTabs = [nameField];
    signer.tabs.emailTabs = [emailField];

    // Create recipients
    const recipients = new docusign.Recipients();
    recipients.signers = [signer];

    // Assemble the envelope
    envelopeDefinition.documents = [document];
    envelopeDefinition.recipients = recipients;
    envelopeDefinition.status = 'sent';

    // Send the envelope
    const envelopesApi = new docusign.EnvelopesApi(this.apiClient);
    const results = await envelopesApi.createEnvelope(DOCUSIGN_ACCOUNT_ID, {
      envelopeDefinition
    });

    return results;
  }

  async getEmbeddedSigningView(envelopeId, recipientEmail, returnUrl) {
    const recipientViewRequest = new docusign.RecipientViewRequest();
    recipientViewRequest.returnUrl = returnUrl;
    recipientViewRequest.authenticationMethod = 'none';
    recipientViewRequest.email = recipientEmail;
    recipientViewRequest.userName = 'Applicant';

    const envelopesApi = new docusign.EnvelopesApi(this.apiClient);
    const results = await envelopesApi.createRecipientView(
      DOCUSIGN_ACCOUNT_ID,
      envelopeId,
      { recipientViewRequest }
    );

    return results.url;
  }

  async getPDFTemplate() {
    // Read your legal agreement PDF and convert to base64
    // This would be your actual legal document
    const fs = require('fs');
    const pdfBuffer = fs.readFileSync('documents/legal-agreement.pdf');
    return pdfBuffer.toString('base64');
  }
}

export default new DocuSignService(); 