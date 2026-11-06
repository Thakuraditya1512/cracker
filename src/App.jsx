import React, { useEffect, useMemo, useState } from "react";
import { PRODUCTS, readStorage, fmtINR } from "./products.js";
import "./style.css";

// localStorage keys
const K_CART = "cc-cart";
const K_ORDERS = "cc-orders";
const K_IMAGES = "cc-images";
const K_NAMES = "cc-names";

export default function App() {
  const [tab, setTab] = useState("shop");            // "shop" | "admin"
  const [query, setQuery] = useState("");            // search text
  const [cat, setCat] = useState("All");             // All | Regular | Fancy
  const [cart, setCart] = useState(() => readStorage(K_CART, {}));      // {id: qty}
  const [orders, setOrders] = useState(() => readStorage(K_ORDERS, []));
  const [images, setImages] = useState(() => readStorage(K_IMAGES, {})); // {id: dataUrl}
  const [names, setNames] = useState(() => readStorage(K_NAMES, {}));    // {id: custom name}
  const [editId, setEditId] = useState(null);        // product id being renamed
  const [editText, setEditText] = useState("");      // draft name text
  const [discount, setDiscount] = useState(0);       // percent
  const [open, setOpen] = useState("");              // expanded admin order number

  // Persist everything to this device (static, no server, no password).
  useEffect(() => localStorage.setItem(K_CART, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(K_ORDERS, JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem(K_IMAGES, JSON.stringify(images)), [images]);
  useEffect(() => localStorage.setItem(K_NAMES, JSON.stringify(names)), [names]);

  // Display name = custom override if present, otherwise the catalogue default.
  const nameOf = (p) => names[p.id] || p.name;

  // One-word friendly search across name + unit, plus category filter.
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchQ = !q || ((names[p.id] || p.name) + " " + p.unit).toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, cat, names]);

  // Derived cart lines and totals.
  const items = PRODUCTS.filter((p) => cart[p.id] > 0).map((p) => ({
    ...p,
    name: nameOf(p),
    qty: +cart[p.id],
    amount: p.price * cart[p.id],
  }));
  const subtotal = items.reduce((s, x) => s + x.amount, 0);
  const pct = Math.min(100, Math.max(0, +discount || 0));
  const discountAmount = (subtotal * pct) / 100;
  const total = subtotal - discountAmount;
  const itemCount = items.reduce((s, x) => s + x.qty, 0);
  const orderNo = String(orders.length + 1).padStart(4, "0");

  // Quantity stepper.
  function changeQty(id, delta) {
    setCart((v) => {
      const next = { ...v };
      const z = Math.max(0, Math.floor((+next[id] || 0) + delta));
      if (z) next[id] = z;
      else delete next[id];
      return next;
    });
  }
  function setQty(id, value) {
    setCart((v) => {
      const next = { ...v };
      const z = Math.max(0, Math.floor(+value || 0));
      if (z) next[id] = z;
      else delete next[id];
      return next;
    });
  }

  // Capture / pick a photo, resize it, and store as a compressed data URL.
  function storePhoto(id, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, 480 / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        setImages((v) => ({ ...v, [id]: canvas.toDataURL("image/jpeg", 0.78) }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  // Rename a product inline. Custom names are stored per id and used everywhere.
  function startRename(p) {
    setEditId(p.id);
    setEditText(nameOf(p));
  }
  function commitRename() {
    if (editId == null) return;
    const clean = editText.trim();
    setNames((v) => {
      const next = { ...v };
      const original = PRODUCTS.find((p) => p.id === editId)?.name || "";
      if (!clean || clean === original) delete next[editId]; // back to default
      else next[editId] = clean;
      return next;
    });
    setEditId(null);
    setEditText("");
  }

  // Save the current cart as an order, then clear for the next customer.
  function saveOrder() {
    if (!items.length) return;
    const order = {
      number: orderNo,
      date: new Date().toISOString(),
      items: items.map(({ id, name, unit, price, qty, amount }) => ({ id, name, unit, price, qty, amount })),
      subtotal,
      discountPercent: pct,
      discountAmount,
      total,
      itemCount,
    };
    setOrders((v) => [...v, order]);
    setCart({});
    setDiscount(0);
    setOpen(orderNo);
    setTab("admin");
  }

  function exportOrders() {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "cracker-shop-orders.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="shell">
      <header>
        <div className="logo">✦</div>
        <div>
          <small>TEMPORARY STORE · COUNTER</small>
          <h1>Cracker<span>Cart</span></h1>
        </div>
        <label className="saved">● Saved on this device</label>
      </header>

      <nav>
        <button className={tab === "shop" ? "active" : ""} onClick={() => setTab("shop")}>
          Shop <i>{itemCount}</i>
        </button>
        <button className={tab === "admin" ? "active" : ""} onClick={() => setTab("admin")}>
          Admin <i>{orders.length}</i>
        </button>
      </nav>

      {tab === "shop" ? (
        <main className="layout">
          <section>
            <div className="heading">
              <div>
                <small>PRODUCT CATALOGUE</small>
                <h2>Find crackers</h2>
              </div>
              <span>{shown.length} items</span>
            </div>

            <input
              className="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="⌕  Search by any word… Lakshmi, rocket, shot"
            />

            <div className="filters">
              {["All", "Regular", "Fancy"].map((x) => (
                <button key={x} className={cat === x ? "chosen" : ""} onClick={() => setCat(x)}>
                  {x}
                </button>
              ))}
            </div>

            <div className="grid">
              {shown.map((p) => (
                <article className="product" key={p.id}>
                  <label className="photo">
                    {images[p.id] ? (
                      <img src={images[p.id]} alt={nameOf(p)} />
                    ) : (
                      <span>
                        ✦<small>ADD PHOTO</small>
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => storePhoto(p.id, e.target.files?.[0])}
                    />
                    <b>＋ Photo</b>
                    <span className="pricebadge">{fmtINR(p.price)}</span>
                  </label>
                  <div className="pinfo">
                    {editId === p.id ? (
                      <div className="nameedit">
                        <input
                          autoFocus
                          className="nameinput"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") commitRename();
                            if (e.key === "Escape") { setEditId(null); setEditText(""); }
                          }}
                        />
                        <div className="actions">
                          <button className="ok" onClick={commitRename}>✓ Save</button>
                          <button className="cancel" onClick={() => { setEditId(null); setEditText(""); }}>✕</button>
                        </div>
                      </div>
                    ) : (
                      <h3
                        className="nameline"
                        title={`${p.unit}${p.packQty ? ` · ${p.packQty} pcs/set` : ""} · ${p.category}`}
                      >
                        <span className="nm">{nameOf(p)}</span>
                        <button className="rename" title="Edit name" onClick={() => startRename(p)}>✎</button>
                        {names[p.id] && <em className="renamed">renamed</em>}
                      </h3>
                    )}
                    <div className="pfoot">
                      <div className="step">
                        <button disabled={!cart[p.id]} onClick={() => changeQty(p.id, -1)}>
                          −
                        </button>
                        <input
                          value={cart[p.id] || 0}
                          inputMode="numeric"
                          onChange={(e) => setQty(p.id, e.target.value)}
                        />
                        <button onClick={() => changeQty(p.id, 1)}>＋</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {!shown.length && <div className="empty">No matches. Try another search word.</div>}
          </section>

          <aside>
            <div className="carthead">
              <div>
                <small>CURRENT CUSTOMER</small>
                <h2>
                  Cart <i>{itemCount}</i>
                </h2>
              </div>
              <div className="cartactions">
                <button className="savebtn" disabled={!items.length} onClick={saveOrder}>
                  💾 Save &amp; Clear
                </button>
                <button
                  className="clear"
                  disabled={!items.length}
                  onClick={() => {
                    if (confirm("Clear this cart without saving?")) {
                      setCart({});
                      setDiscount(0);
                    }
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            {items.length ? (
              <div className="lines">
                {items.map((x) => (
                  <div className="line" key={x.id}>
                    <div>
                      <b>{x.name}</b>
                      <small>
                        {x.qty} × {fmtINR(x.price)}
                      </small>
                      <div className="ministep">
                        <button onClick={() => changeQty(x.id, -1)}>−</button>
                        {x.qty}
                        <button onClick={() => changeQty(x.id, 1)}>＋</button>
                      </div>
                    </div>
                    <strong>{fmtINR(x.amount)}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <div className="emptycart">
                <b>＋</b>
                <strong>Cart is empty</strong>
                <p>Add items from the catalogue as the customer chooses.</p>
              </div>
            )}

            <div className="bill">
              <div>
                <span>Subtotal</span>
                <b>{fmtINR(subtotal)}</b>
              </div>
              <div className="discount">
                <label>Discount</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <span>%</span>
                <b>− {fmtINR(discountAmount)}</b>
              </div>
              <div className="total">
                <span>Total payable</span>
                <strong>{fmtINR(total)}</strong>
              </div>
              <button className="save" disabled={!items.length} onClick={saveOrder}>
                Save order &amp; clear <b>→</b>
              </button>
              <small className="note">Order #{orderNo} will be saved in Admin.</small>
            </div>
          </aside>
        </main>
      ) : (
        <main className="admin">
          <div className="heading">
            <div>
              <small>STORE RECORDS</small>
              <h2>Admin</h2>
              <p>Every saved customer order, in sequence.</p>
            </div>
            <button className="export" disabled={!orders.length} onClick={exportOrders}>
              ↓ Export records
            </button>
          </div>

          <div className="stats">
            <div>
              <small>ORDERS SAVED</small>
              <b>{orders.length}</b>
            </div>
            <div>
              <small>ITEMS SOLD</small>
              <b>{orders.reduce((s, o) => s + o.itemCount, 0)}</b>
            </div>
            <div>
              <small>SALES TOTAL</small>
              <b>{fmtINR(orders.reduce((s, o) => s + o.total, 0))}</b>
            </div>
          </div>

          {!orders.length ? (
            <div className="empty adminempty">
              <h3>No saved orders yet</h3>
              <p>Saved bills will appear here.</p>
              <button className="save" onClick={() => setTab("shop")}>
                Go to shop →
              </button>
            </div>
          ) : (
            <div className="orders">
              {[...orders].reverse().map((o) => (
                <article key={o.number}>
                  <button
                    className="orderhead"
                    onClick={() => setOpen(open === o.number ? "" : o.number)}
                  >
                    <span>
                      <small>ORDER #{o.number}</small>
                      <b>
                        {new Date(o.date).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </b>
                      <em>
                        {o.itemCount} units · {o.items.length} products
                      </em>
                    </span>
                    <span className="orderprice">
                      <b>{fmtINR(o.total)}</b>
                      <small>{open === o.number ? "Hide details" : "View details"}⌄</small>
                    </span>
                  </button>

                  {open === o.number && (
                    <div className="details">
                      <div className="drow dhead">
                        <span>ITEM</span>
                        <span>QTY</span>
                        <span>PRICE</span>
                        <span>AMOUNT</span>
                      </div>
                      {o.items.map((x) => (
                        <div className="drow" key={x.id}>
                          <span>
                            {x.name}
                            <small>{x.unit}</small>
                          </span>
                          <span>{x.qty}</span>
                          <span>{fmtINR(x.price)}</span>
                          <b>{fmtINR(x.amount)}</b>
                        </div>
                      ))}
                      <div className="totals">
                        <span>
                          Subtotal <b>{fmtINR(o.subtotal)}</b>
                        </span>
                        <span>
                          Discount ({o.discountPercent}%) <b>− {fmtINR(o.discountAmount)}</b>
                        </span>
                        <strong>
                          Total paid <b>{fmtINR(o.total)}</b>
                        </strong>
                      </div>
                      <button className="export" onClick={() => window.print()}>
                        Print order
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </main>
      )}

      <footer>
        CRACKERCART <span>Local device storage · No password required</span>
      </footer>
    </div>
  );
}
