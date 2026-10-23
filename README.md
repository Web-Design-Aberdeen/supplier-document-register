# Supplier Website Readiness Planner

Build a practical list of capability information, project evidence and documents to prepare for your website.

**For Aberdeen suppliers and service firms. No coding knowledge needed.**

[Open the free tool](https://web-design-aberdeen.github.io/supplier-document-register/) · [See a fictional worked example](https://web-design-aberdeen.github.io/supplier-document-register/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Build my readiness plan** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

A buyer-information plan with specific gaps to fill before publishing.

## What to expect

Think about what a prospective buyer needs to understand before making an enquiry. You do not need to upload any documents.

This organises your information. It does not verify certifications, approve supplier status or assess procurement compliance.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [Aberdeen Web Design](https://webdesignaberdeen.uk/). The tool is maintained by Aberdeen Web Design, operated by JW Digital Services Ltd. The commercial website is a separate project.

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/Web-Design-Aberdeen/supplier-document-register/discussions/1).
