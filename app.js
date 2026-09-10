const transactions = [
  {date:"09/10/26",description:"Client payment — Acme",category:"Revenue",type:"income",status:"Cleared",amount:6200},
  {date:"09/09/26",description:"Payroll — September",category:"Payroll",type:"expense",status:"Cleared",amount:9200},
  {date:"09/08/26",description:"Google Ads",category:"Marketing",type:"expense",status:"Cleared",amount:1240},
  {date:"09/07/26",description:"Monthly rent",category:"Rent",type:"expense",status:"Cleared",amount:2800},
  {date:"09/06/26",description:"Client payment — Northstar",category:"Revenue",type:"income",status:"Cleared",amount:4800},
  {date:"09/05/26",description:"Software subscriptions",category:"Software",type:"expense",status:"Cleared",amount:730},
  {date:"09/04/26",description:"Office supplies",category:"Supplies",type:"expense",status:"Pending",amount:410},
  {date:"09/03/26",description:"Client payment — Atlas",category:"Revenue",type:"income",status:"Cleared",amount:3500},
  {date:"09/02/26",description:"Client payment — Ridge",category:"Revenue",type:"income",status:"Cleared",amount:5100}
];

const expenseMix = [
  ["Payroll",9200],["Marketing",4800],["Rent",2800],["Software",2130],["Supplies",1450]
];
const budget = [
  ["Payroll",10000,9200],["Marketing",6000,4800],["Rent",2800,2800],["Software",2400,2130],["Supplies",1800,1450]
];

const $ = id => document.getElementById(id);
const money = n => "$" + Number(n).toLocaleString("en-US",{maximumFractionDigits:0});
const recentBody = $("recentBody"), txBody = $("transactionsBody");

function transactionRows(list, full=false){
  return list.map(t => `<tr>
    <td>${t.date}</td><td><b>${t.description}</b></td><td>${t.category}</td>
    ${full ? `<td><span class="pill ${t.type}">${t.type}</span></td>` : ""}
    <td><span class="pill">${t.status}</span></td>
    <td class="right" style="color:${t.type==="expense"?"#bd5557":"#16835a"}">${t.type==="expense"?"−":"+"}${money(t.amount)}</td>
  </tr>`).join("");
}
function renderTransactions(){
  const q=$("searchInput").value.toLowerCase(), c=$("categoryFilter").value, ty=$("typeFilter").value;
  const list=transactions.filter(t=>
    (t.description.toLowerCase().includes(q)||t.category.toLowerCase().includes(q)) &&
    (c==="all"||t.category===c)&&(ty==="all"||t.type===ty));
  txBody.innerHTML=transactionRows(list,true)||`<tr><td colspan="6">No transactions found.</td></tr>`;
}
recentBody.innerHTML=transactionRows(transactions.slice(0,5));
renderTransactions();

function drawLineChart(canvasId, datasets, labels){
  const c=$(canvasId), ctx=c.getContext("2d"), dpr=devicePixelRatio||1, rect=c.getBoundingClientRect();
  c.width=rect.width*dpr;c.height=rect.height*dpr;ctx.scale(dpr,dpr);
  const w=rect.width,h=rect.height,p={l:38,r:15,t:15,b:28};
  ctx.font="10px Inter";ctx.strokeStyle="#e9edf3";ctx.fillStyle="#8993a5";
  for(let i=0;i<5;i++){let y=p.t+(h-p.t-p.b)*i/4;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(w-p.r,y);ctx.stroke();ctx.fillText("$"+(60-i*15)+"k",2,y+3)}
  datasets.forEach((ds,di)=>{
    const max=70,min=0;ctx.beginPath();ctx.lineWidth=2;ctx.strokeStyle=di===0?"#5369f4":"#cbd2df";
    ds.forEach((v,i)=>{let x=p.l+(w-p.l-p.r)*i/(ds.length-1),y=p.t+(h-p.t-p.b)*(1-(v-min)/(max-min));i?ctx.lineTo(x,y):ctx.moveTo(x,y)});
    ctx.stroke();
  });
  labels.forEach((x,i)=>{ctx.fillStyle="#8993a5";ctx.fillText(x,p.l+(w-p.l-p.r)*i/(labels.length-1)-7,h-7)});
}
function drawDonut(){
  const c=$("donutChart"),ctx=c.getContext("2d"),total=expenseMix.reduce((a,x)=>a+x[1],0),colors=["#5369f4","#7f91f7","#aab6fa","#cbd2df","#e4e8ef"];
  let start=-Math.PI/2;
  expenseMix.forEach((x,i)=>{let ang=x[1]/total*Math.PI*2;ctx.beginPath();ctx.moveTo(105,105);ctx.arc(105,105,78,start,start+ang);ctx.closePath();ctx.fillStyle=colors[i];ctx.fill();start+=ang});
  ctx.beginPath();ctx.arc(105,105,51,0,Math.PI*2);ctx.fillStyle=document.body.classList.contains("dark")?"#151e2d":"#fff";ctx.fill();
  $("expenseLegend").innerHTML=expenseMix.map((x,i)=>`<div><span><i style="background:${colors[i]}"></i>${x[0]}</span><b>${Math.round(x[1]/total*100)}%</b></div>`).join("");
}
function spark(){
  document.querySelectorAll(".spark").forEach(el=>{
    const v=el.dataset.values.split(",").map(Number), max=Math.max(...v),min=Math.min(...v),w=160,h=28;
    el.innerHTML=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><polyline fill="none" stroke="#5369f4" stroke-width="2" points="${v.map((n,i)=>`${i*(w/(v.length-1))},${h-3-(n-min)/(max-min)*(h-7)}`).join(" ")}"/></svg>`;
  });
}
function renderBudget(){
  $("budgetList").innerHTML=budget.map(x=>`<div class="budget-row"><strong>${x[0]}</strong><div class="bar"><i style="width:${Math.min(x[2]/x[1]*100,100)}%"></i></div><span>${money(x[2])} / ${money(x[1])}</span></div>`).join("");
}
function charts(){
  drawLineChart("cashChart",[[32,38,35,44,41,51,55,53,61],[16,18,17,22,20,25,23,27,30]],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]);
  drawLineChart("revenueChart",[[36,39,41,43,42,45,44,47,49,48,52,55]],["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"]);
  drawDonut();spark();renderBudget();
}
charts();
window.addEventListener("resize",charts);

document.querySelectorAll(".nav-item[data-view],.text-btn[data-view-link]").forEach(b=>b.addEventListener("click",()=>{
  const view=b.dataset.view||b.dataset.viewLink;
  document.querySelectorAll(".view").forEach(x=>x.classList.add("hidden"));
  $(view+"View").classList.remove("hidden");
  document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.view===view));
  $("pageTitle").textContent={overview:"Business overview",transactions:"Transactions",analytics:"Financial analytics",budget:"Budget & planning"}[view];
}));
$("searchInput").addEventListener("input",renderTransactions);
$("categoryFilter").addEventListener("change",renderTransactions);
$("typeFilter").addEventListener("change",renderTransactions);
$("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");charts()});
$("addBtn").addEventListener("click",()=>$("transactionModal").showModal());
$("transactionForm").addEventListener("submit",e=>{
  e.preventDefault(); const f=new FormData(e.target);
  transactions.unshift({date:new Date(f.get("date")).toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"2-digit"}),description:f.get("description"),category:f.get("category"),type:f.get("type"),status:"Pending",amount:Number(f.get("amount"))});
  recentBody.innerHTML=transactionRows(transactions.slice(0,5));renderTransactions();e.target.reset();$("transactionModal").close();
});
$("exportBtn").addEventListener("click",()=>{
  const headers=["Date","Description","Category","Type","Status","Amount"];
  const csv=[headers,...transactions.map(t=>[t.date,t.description,t.category,t.type,t.status,t.amount])].map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download="bizpulse-transactions.csv";a.click();
});
$("periodSelect").addEventListener("change",e=>{
  const data={month:[48620,21380,27240],quarter:[142800,64100,78700],year:[534600,241200,293400]}[e.target.value];
  $("revenueMetric").textContent=money(data[0]);$("expenseMetric").textContent=money(data[1]);$("profitMetric").textContent=money(data[2]);
});
