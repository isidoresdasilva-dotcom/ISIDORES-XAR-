const BOOKS = [
  {id:"ingles-zero", title:"Como Aprender Inglês do Zero", description:"Guia prático para começar a aprender inglês passo a passo.", price:5000, category:"Educação"},
  {id:"ingles-fluente", title:"Inglês Fluente sem Mestre em Três Meses", description:"Método de estudo com vocabulário, gramática, pronúncia e exercícios.", price:7500, category:"Educação"},
  {id:"historias-xara", title:"Histórias de Isidores & Xará", description:"Histórias educativas para aprender através da aventura.", price:4000, category:"Infantil"},
  {id:"aventuras", title:"Aventuras que Marcam", description:"Uma coleção de histórias, valores e descobertas.", price:4500, category:"Infantil"}
];

const money = n => new Intl.NumberFormat("pt-AO",{style:"currency",currency:"AOA",maximumFractionDigits:0}).format(n).replace("AOA","Kz");
const getCart = () => JSON.parse(localStorage.getItem("ix_cart") || "[]");
const setCart = c => {localStorage.setItem("ix_cart",JSON.stringify(c)); updateCartCount();};
const getOrders = () => JSON.parse(localStorage.getItem("ix_orders") || "[]");
const setOrders = o => localStorage.setItem("ix_orders",JSON.stringify(o));
const getUser = () => JSON.parse(localStorage.getItem("ix_user") || "null");

function updateCartCount(){
  const el=document.getElementById("cartCount");
  if(el) el.textContent=getCart().length;
}
function bookCard(b){
 return `<article class="book-card">
   <div class="book-cover">📖<br>${b.title}</div>
   <div class="book-body">
     <span class="eyebrow">${b.category}</span>
     <h3>${b.title}</h3><p>${b.description}</p>
     <div class="price">${money(b.price)}</div>
     <div class="book-actions">
       <button class="btn btn-blue" onclick="addToCart('${b.id}')">🛒 Comprar</button>
     </div>
   </div>
 </article>`;
}
function renderBooks(){
 const grid=document.getElementById("bookGrid"); if(!grid)return;
 grid.innerHTML=BOOKS.map(bookCard).join("");
}
function addToCart(id){
 const b=BOOKS.find(x=>x.id===id); if(!b)return;
 const cart=getCart(); if(!cart.some(x=>x.id===id)) cart.push({id:b.id});
 setCart(cart); alert("Livro adicionado ao carrinho."); location.href="checkout.html";
}
function renderCheckout(){
 const box=document.getElementById("checkoutItems"); if(!box)return;
 const cart=getCart();
 if(!cart.length){box.innerHTML='<div class="notice">Seu carrinho está vazio. <a href="livros.html">Ver livros</a></div>';return;}
 let total=0;
 box.innerHTML=cart.map(x=>{const b=BOOKS.find(y=>y.id===x.id);total+=b.price;return `<div class="order-item"><span>${b.title}</span><strong>${money(b.price)}</strong></div>`}).join("")+
 `<div class="order-item"><strong>Total</strong><strong>${money(total)}</strong></div>`;
 const u=getUser(); if(u){document.getElementById("buyerName").value=u.name||"";document.getElementById("buyerEmail").value=u.email||"";}
}
function updatePaymentInstructions(){
 const el=document.getElementById("paymentInstructions"); if(!el)return;
 const m=document.getElementById("paymentMethod").value;
 if(m==="Multicaixa Express") el.innerHTML="<strong>Multicaixa Express</strong><br>Configure aqui o seu número oficial antes de publicar o site.<br><b>Exemplo:</b> 9XX XXX XXX";
 else if(m==="Transferência bancária") el.innerHTML="<strong>Transferência bancária</strong><br>Configure aqui o seu banco, titular, IBAN/conta e referência oficial.";
 else el.innerHTML="";
}
function submitCheckout(e){
 e.preventDefault();
 const cart=getCart(); if(!cart.length){alert("Adicione pelo menos um livro.");return;}
 const order={id:"IX-"+Date.now(),date:new Date().toISOString(),name:buyerName.value,email:buyerEmail.value,phone:buyerPhone.value,payment:paymentMethod.value,status:"Pendente",items:cart.map(x=>x.id)};
 const orders=getOrders();orders.unshift(order);setOrders(orders);
 localStorage.setItem("ix_user",JSON.stringify({name:order.name,email:order.email}));
 setCart([]);
 alert("Pedido registrado! Envie o comprovativo pelo canal definido pelo administrador. O acesso será liberado após a confirmação.");
 location.href="conta.html";
}
function renderAccount(){
 const box=document.getElementById("accountBox"); if(!box)return;
 const u=getUser();
 if(!u){box.innerHTML='<div class="panel"><h1>Minha conta</h1><p>Faça login para consultar sua biblioteca.</p><a class="btn btn-blue" href="login.html">Entrar</a></div>';return;}
 box.innerHTML=`<div class="panel"><span class="eyebrow">OLÁ!</span><h1>${u.name}</h1><p>${u.email}</p><button class="btn btn-dark" onclick="logout()">Sair</button></div>`;
 const library=document.getElementById("libraryGrid");
 const orders=getOrders().filter(o=>o.email===u.email && o.status==="Pago");
 const ids=[...new Set(orders.flatMap(o=>o.items))];
 library.innerHTML=ids.length?ids.map(id=>bookCard(BOOKS.find(b=>b.id===id))).join(""):"<div class='panel'>Ainda não há livros liberados. Os livros aparecem aqui depois da confirmação do pagamento.</div>";
}
function logout(){localStorage.removeItem("ix_user");location.href="login.html";}
function setupLogin(){
 const f=document.getElementById("loginForm"); if(f)f.addEventListener("submit",e=>{e.preventDefault();localStorage.setItem("ix_user",JSON.stringify({name:loginName.value.trim(),email:loginEmail.value.trim()}));location.href="conta.html";});
 const ad=document.getElementById("adminDemo"); if(ad)ad.onclick=()=>location.href="admin.html";
}
function renderAdmin(){
 if(!document.getElementById("ordersTable"))return;
 const orders=getOrders(); const total=orders.reduce((s,o)=>s+(o.items||[]).reduce((a,id)=>a+(BOOKS.find(b=>b.id===id)?.price||0),0),0);
 statOrders.textContent=orders.length;statSales.textContent=money(total);statUsers.textContent=new Set(orders.map(o=>o.email)).size;
 ordersTable.innerHTML=orders.length?orders.map(o=>`<div class="order-row"><b>${o.id}</b> — ${o.name} — ${o.email}<br><span>${o.payment} · ${o.status}</span><br>${o.items.map(id=>BOOKS.find(b=>b.id===id)?.title||id).join(", ")}<br><button class="btn btn-yellow" onclick="approveOrder('${o.id}')">✅ Confirmar pagamento</button></div>`).join(""):"<p>Nenhum pedido.</p>";
 adminBooks.innerHTML=BOOKS.map(b=>`<div class="order-row"><b>${b.title}</b> — ${money(b.price)} — ${b.category}</div>`).join("");
}
function approveOrder(id){const o=getOrders();const x=o.find(a=>a.id===id);if(x){x.status="Pago";setOrders(o);renderAdmin();alert("Pagamento confirmado. O livro foi liberado na conta do cliente.");}}
function init(){
 updateCartCount();renderBooks();renderCheckout();renderAccount();setupLogin();renderAdmin();
 const pm=document.getElementById("paymentMethod");if(pm)pm.addEventListener("change",updatePaymentInstructions);
 const cf=document.getElementById("checkoutForm");if(cf)cf.addEventListener("submit",submitCheckout);
 const clear=document.getElementById("clearOrders");if(clear)clear.onclick=()=>{if(confirm("Apagar pedidos de demonstração?")){localStorage.removeItem("ix_orders");renderAdmin();}};
 const y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded",init);
