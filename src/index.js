import {array,text,unique,date,https,issue,escape,list,issuesHTML} from './util.js';
export const guide='Supply supplier, asOf and documents: id, title, url, document_type, version, owner, review_due, public (boolean). Optional expires_on is different from review_due. Private records never enter publication output.';
export function analyse(input){
 text(input.supplier,'supplier');date(input.asOf,'asOf');const issues=[];
 const all=unique(array(input.documents,'documents'),'id');
 for(const d of all)if(typeof d.public!=='boolean')throw Error('Every document needs an explicit public boolean');
 const hiddenCount=all.filter(d=>!d.public).length;
 const documents=all.filter(d=>d.public).map(d=>{
  for(const key of ['title','document_type','version'])text(d[key],key);
  if(!https(d.url))throw Error('Public document URL must use HTTPS');
  date(d.review_due,'review_due');if(d.expires_on)date(d.expires_on,'expires_on');
  if(!d.owner)issues.push(issue('owner','Assign a review owner',d.id));
  if(d.review_due<input.asOf)issues.push(issue('review','Document review is overdue; this is not an expiry judgement',d.id));
  if(d.expires_on&&d.expires_on<input.asOf)issues.push(issue('expiry','Supplied expiry date has passed; confirm current status',d.id));
  return {id:d.id,title:d.title,url:d.url,document_type:d.document_type,version:d.version,review_due:d.review_due,expires_on:d.expires_on||null,owner:d.owner||null};
 });
 return {title:input.supplier+' document register',summary:documents.length+' public documents. '+hiddenCount+' private records excluded, including their identifiers. Review dates do not certify credentials.',documents,issues,markdown:documents.map(d=>'- '+d.title+' ('+d.document_type+', '+d.version+'): '+d.url+'; review due '+d.review_due).join('\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p><div class="grid">'+r.documents.map(d=>'<article class="card"><span class="badge">'+escape(d.document_type)+'</span><h3><a href="'+escape(d.url)+'">'+escape(d.title)+'</a></h3>'+list(['Version: '+d.version,'Review due: '+d.review_due,'Expiry: '+(d.expires_on||'Not supplied')])+'</article>').join('')+'</div>'+issuesHTML(r.issues);
