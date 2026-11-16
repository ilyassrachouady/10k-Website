import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const trim=(v,max)=>typeof v==='string'?v.trim().slice(0,max):'';
export async function POST(request){
 try{
  if(!(request.headers.get('content-type')||'').includes('application/json')) return Response.json({error:'Format non pris en charge.'},{status:415});
  if(Number(request.headers.get('content-length')||0)>12000) return Response.json({error:'Demande trop volumineuse.'},{status:413});
  const origin=request.headers.get('origin');if(origin&&new URL(origin).host!==request.headers.get('host'))return Response.json({error:'Origine non autorisée.'},{status:403});
  const p=await request.json();if(!p||typeof p!=='object')return Response.json({error:'Données invalides.'},{status:400});
  if(trim(p.website,500))return Response.json({ok:true,reference:'accepted'},{status:202});
  const startedAt=Number(p.startedAt);
  if(!Number.isFinite(startedAt)||startedAt<=0||Date.now()-startedAt<950||Date.now()-startedAt>86400000)return Response.json({error:'Veuillez actualiser la page et réessayer.'},{status:400});
  const lead={
   reference:'AC-'+randomUUID(),
   name:trim(p.name,120),phone:trim(p.phone,40),email:trim(p.email,200).toLowerCase(),
   service:trim(p.service,120),propertyType:trim(p.propertyType,60),message:trim(p.message,3000),
   consent:p.consent===true,source:'angelique-cleaning-services.vercel.app',receivedAt:new Date().toISOString()
  };
  if(lead.name.length<2||lead.phone.replace(/\D/g,'').length<7||!lead.service||!lead.consent||(lead.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)))
   return Response.json({error:'Vérifiez votre nom, votre téléphone et votre consentement.'},{status:422});
  if(!process.env.BLOB_READ_WRITE_TOKEN){console.error('Quote storage not connected');return Response.json({error:'Service temporairement indisponible. Veuillez nous appeler.'},{status:503});}
  await put('demandes/'+new Date().toISOString().slice(0,10)+'/'+lead.reference+'.json',JSON.stringify(lead),{access:'private',contentType:'application/json',addRandomSuffix:true});
  if(process.env.LEAD_WEBHOOK_URL){
   try{const delivery=await fetch(process.env.LEAD_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(lead),signal:AbortSignal.timeout(5000)});if(!delivery.ok)console.error('Lead webhook status:',delivery.status);}
   catch(e){console.error('Lead webhook error:',e.message);}
  }
  return Response.json({ok:true,reference:lead.reference,message:'Demande reçue.'},{status:201});
 }catch(e){console.error('Quote handler:',e.message);return Response.json({error:'Le service rencontre un problème temporaire. Veuillez nous appeler.'},{status:500});}
}
export function GET(){return Response.json({error:'Méthode non autorisée.'},{status:405});}
