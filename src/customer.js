import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Supplier Website Readiness Planner",
  "short": "Give buyers the information they need",
  "audience": "For Aberdeen suppliers and service firms",
  "summary": "Build a practical list of capability information, project evidence and documents to prepare for your website.",
  "button": "Build my readiness plan",
  "filename": "supplier-website-plan",
  "eyebrow": "Clear capability. Useful evidence.",
  "time": "About 5 minutes",
  "outcome": "A buyer-information plan with specific gaps to fill before publishing.",
  "layout": "supplier",
  "intro": "Think about what a prospective buyer needs to understand before making an enquiry. You do not need to upload any documents.",
  "note": "This organises your information. It does not verify certifications, approve supplier status or assess procurement compliance.",
  "fields": [
    {
      "id": "business",
      "label": "Business name",
      "help": "",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "supply",
      "label": "What do you supply?",
      "help": "For example: specialist inspection services or fabricated components.",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "buyers",
      "label": "Who buys from you?",
      "help": "Describe the actual sectors or buyer roles.",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "ready",
      "label": "What do you already have ready to share?",
      "options": [
        "Capability summary",
        "Service specifications",
        "Approved project examples",
        "Verified accreditations",
        "Coverage and delivery information",
        "Current contact details"
      ],
      "help": "",
      "type": "checks",
      "wide": true
    },
    {
      "id": "questions",
      "label": "What do buyers ask before requesting a quote?",
      "help": "One question per line.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    },
    {
      "id": "owner",
      "label": "Who will keep website information up to date?",
      "help": "A role is enough, for example: Operations manager.",
      "required": false,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "limits",
      "label": "Are there important scope or delivery limits?",
      "help": "Optional. Include only confirmed limits or exclusions.",
      "required": false,
      "type": "textarea",
      "maxLength": 2500,
      "wide": true
    }
  ],
  "example": {
    "business": "Example Aberdeen Supplier",
    "supply": "Inspection and reporting services",
    "buyers": "Facilities teams and procurement managers",
    "ready": [
      "Capability summary",
      "Current contact details"
    ],
    "questions": "Which areas do you cover?\nWhat information is needed for a quote?",
    "owner": "Operations manager",
    "limits": "Availability and scope confirmed for each project."
  }
};
export function evaluate(v){const ready=selected(v.ready),all=['Capability summary','Service specifications','Approved project examples','Verified accreditations','Coverage and delivery information','Current contact details'];return report(requireText(v.business,'your business name')+': supplier website plan','Prepare clear buyer information before investing in more website pages.',[section('Who the website needs to help',['Supply: '+requireText(v.supply,'what you supply'),'Buyers: '+requireText(v.buyers,'who buys from you')]),section('Information already available',ready.length?ready:['No material marked ready yet. Start with a short capability statement and a working enquiry route.']),section('Gather or decide what is relevant',all.filter(x=>!ready.includes(x)).map(x=>x==='Verified accreditations'?'Accreditations: include only those you actually hold, with permission to display them.':x+': prepare approved material or decide whether it is relevant.')),section('Buyer questions to answer',lines(v.questions).length?lines(v.questions):['What work can you take on?','What information is needed for an accurate quote?','Who should a buyer contact and what happens next?']),section('Publishing responsibilities',['Information owner: '+(clean(v.owner)||'Assign an owner before publishing.'),clean(v.limits)?'Scope and delivery limits: '+clean(v.limits):'Confirm coverage, delivery limits and any exclusions.','Keep document dates and versions visible. Review permission before publishing client names or project material.'])]);}
