---
weight: 1000
title: Items List
description: Overview of items, upgrades and the crafting system.
---

<!-- Item List with Search -->
<div class="input-group mb-3">
  <span class="input-group-text" id="item-search-addon">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
    </svg>
  </span>
  <input type="text" class="form-control" placeholder="Item Name" aria-label="Item Name"
    aria-describedby="item-search-addon" onkeyup="filterItems(this.value)">
</div>

<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4" id="item-list-container">

  <!-- Mobile Laboratory -->
  <div class="col" id="mobile-laboratory">
    <div class="card text-light shadow h-100">
      <div class="row g-0">
        <div class="col-4 d-flex align-items-center justify-content-center p-4">
          <img src="/items/128.svg" class="img-fluid rounded" alt="Icon for Mobile Laboratory" />
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">Mobile Laboratory</h5>
            <p class="card-text small mb-1 d-flex">
              <span class="w-50"><strong>Weight:</strong> 15</span>
              <span class="w-50"><strong>Type:</strong> Tool</span>
            </p>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="card-body pt-0">
            <div class="card-text small">
              Alchemists use those laboratories to work on new recipies or brew potions and elexiers. The must have of every alchemist.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Grape -->
  <div class="col" id="grape">
    <div class="card text-light shadow h-100">
      <div class="row g-0">
        <div class="col-4 d-flex align-items-center justify-content-center p-4">
          <img src="/items/128.svg" class="img-fluid rounded" alt="Icon for Grape" />
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">Grape</h5>
            <p class="card-text small mb-1 d-flex">
              <span class="w-50"><strong>Weight:</strong> 0.1</span>
              <span class="w-50"><strong>Type:</strong> Usable</span>
            </p>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="card-body pt-0">
            <div class="card-text small">
              A sweet, ripe purple grape. Restores 5 Mana.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Example item template for you to copy and modify -->
  <!--
  <div class="col" id="item-name-id">
    <div class="card text-light shadow h-100">
      <div class="row g-0">
        <div class="col-4 d-flex align-items-center justify-content-center p-4">
          <img src="/items/your-icon.png" class="img-fluid rounded" alt="Icon for Item Name" />
        </div>
        <div class="col-8">
          <div class="card-body">
            <h5 class="card-title">Item Name</h5>
            <p class="card-text small mb-1 d-flex">
              <span class="w-50"><strong>Weight:</strong> 0.0</span>
              <span class="w-50"><strong>Type:</strong> Type Here</span>
            </p>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col">
          <div class="card-body pt-0">
            <div class="card-text small">
              Item description goes here.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  -->

</div>

<script>
  function filterItems(query) {
    const cards = document.querySelectorAll('#item-list-container .col');
    query = query.toLowerCase();
    cards.forEach(card => {
      const title = card.querySelector('.card-title');
      if (title && title.textContent.toLowerCase().includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }
</script>
