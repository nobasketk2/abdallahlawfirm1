const SERVICES=[["Family Law","Divorce, custody, maintenance and protection orders handled with discretion."],["Criminal Law","Defence at every stage, from police statements to appeals."],["Labour/Employment Law","Unfair dismissal, contracts and workplace disputes for employees and employers."],["Tenancy and Rental Law","Lease advice, eviction and deposit disputes for tenants and landlords."],["Commercial Law","Company, trade and regulatory advice for growing businesses."],["Contractual Disputes","Breach, remedies and negotiated settlements."],["Litigation and Arbitration","Representation before domestic courts and international tribunals."],["Mediation","Confidential, faster ways to resolve a dispute without trial."],["Contract Drafting","Clear agreements that anticipate problems before they start."]];
const ARTICLES=[["Know your rights when renting","Tenancy","A short guide to deposits, notice periods and repairs."],["How arbitration differs from court","Arbitration","What to expect, how long it takes and what it costs."],["Dismissed from work? First steps","Labour","The deadlines and documents that matter most."]];
const PAGES=[["index.html","Home"],["lawyer.html","Meet the Lawyer"],["expertise.html","Expertise"],["articles.html","Articles"],["contact.html","Contact Us"]];
const MAP='<iframe title="Map showing PML Ebene, Mauritius" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=57.482%2C-20.250%2C57.502%2C-20.236&layer=mapnik&marker=-20.2436%2C57.4906"></iframe>';
$(function(){
 const cur=location.pathname.split('/').pop()||'index.html';
 $('#site-header').replaceWith(`<header class="site"><div class="wrap bar"><a class="logo" href="index.html" aria-label="abdallah law firm, home"><svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><path d="M17 3v28M7 31h20M5 9h24M5 9l-4 10h8zM29 9l-4 10h8z" fill="none" stroke="#d4b15f" stroke-width="2"/></svg><span>abdallah<small>CONSULTANCY FIRM</small></span></a><nav id="nav" aria-label="Main"><ul>${PAGES.map(p=>`<li><a href="${p[0]}" ${p[0]==cur?'aria-current="page"':''}>${p[1]}</a></li>`).join('')}</ul></nav><div class="tools"><button class="icon-btn" id="theme" aria-label="Toggle dark mode">◐</button><button class="icon-btn" id="menu" aria-label="Menu" aria-expanded="false">☰</button></div></div></header>`);
 $('#site-footer').replaceWith(`<footer class="site"><div class="wrap"><div class="grid"><div><b style="font:700 1.4rem Georgia">abdallah</b><p>Legal services with high professionalism and outstanding results.</p></div><div><p>+230 57995620<br><a href="mailto:abdallah@gmail.com">abdallah@gmail.com</a><br>1 Example Street, Port Louis</p></div><div><p>Member: International Bar Society, National Bar Council</p></div></div><small>Information on this website is general in nature and does not constitute legal advice. © 2026 abdallah law firm.</small></div></footer><button id="top" aria-label="Back to top">↑</button>`);
 try{const t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}
 $('#theme').on('click',()=>{const d=document.documentElement.dataset.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=d;try{localStorage.setItem('theme',d)}catch(e){}});
 $('#menu').on('click',function(){const o=$('#nav').toggleClass('open').hasClass('open');$(this).attr('aria-expanded',o)});
 $('#services').html(SERVICES.map(s=>`<article class="card reveal"><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join(''));
 $('#expertise').html(SERVICES.map((s,i)=>`<section id="a${i}" class="${i%2?'alt':''}"><div class="wrap reveal"><h2>${s[0]}</h2><p>${s[1]} Contact us to discuss your situation and the options available.</p></div></section>`).join(''));
 $('#articles').html(ARTICLES.map(a=>`<article class="card reveal"><span class="tag">${a[1]}</span><h3>${a[0]}</h3><p>${a[2]}</p><a href="#">Read more (placeholder)</a></article>`).join(''));
 $('.map').html(MAP);
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
 $('.reveal').each((_,el)=>io.observe(el));
 const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const $n=$(e.target),end=+$n.data('n');$({v:0}).animate({v:end},{duration:1500,step:v=>$n.text(Math.floor(v)+'+')});co.unobserve(e.target)}));
 $('[data-n]').each((_,el)=>co.observe(el));
 const sl=$('.slide');let i=0;
 if(sl.length){const dots=$('.dots');sl.each((k)=>dots.append(`<button aria-label="Review ${k+1}"></button>`));
  const show=n=>{i=n;sl.removeClass('on').eq(n).addClass('on');dots.children().attr('aria-current','false').eq(n).attr('aria-current','true')};
  dots.on('click','button',function(){show($(this).index())});show(0);
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(()=>show((i+1)%sl.length),7000)}
 $(window).on('scroll',()=>$('#top').toggle(scrollY>400));$(document).on('click','#top',()=>scrollTo({top:0}));
 $('#cf').on('submit',function(e){e.preventDefault();let ok=true;
  const rule=(id,test,msg)=>{const v=$('#'+id).val().trim(),bad=!test(v);$('#e-'+id).text(bad?msg:'');$('#'+id).attr('aria-invalid',bad);if(bad)ok=false};
  rule('name',v=>v.length>=2,'Enter your full name.');
  rule('email',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),'Enter a valid email, like name@example.com.');
  rule('phone',v=>/^\+?[\d\s-]{7,15}$/.test(v),'Enter a phone number with 7 to 15 digits.');
  rule('area',v=>v!=='','Choose a practice area.');
  rule('msg',v=>v.length>=10,'Write at least 10 characters.');
  const c=$('#consent').is(':checked');$('#e-consent').text(c?'':'Tick the box to give your consent.');if(!c)ok=false;
  if(ok){$('#ok').show().trigger('focus');this.reset()}else $('[aria-invalid=true]').first().trigger('focus')});
});
