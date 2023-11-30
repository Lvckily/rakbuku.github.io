function generateId(){
    return new Date().getTime();
};

// fungsi tambah buku

function tambahBuku(judul, penulis, tahun, isCompleted){
    const books = JSON.parse(localStorage.getItem('books'))

    tahun = Number(tahun);

    const bukuBaru = {
        id: generateId(),
        judul,
        penulis,
        tahun,
        isCompleted
    };

    books.push (bukuBaru);

    localStorage.setItem('books', JSON.stringify(books));

    alert('Buku Berhasil Ditambahkan!');

    renderBuku();
};

// fungsi render buku
function renderBuku(){
    const books = JSON.parse (localStorage.getItem('books')) || [];
    const listBelumBaca = document.getElementById('belumBaca');
    const listSudahBaca = document.getElementById('sudahBaca');
    const daftarBelumBaca = document.getElementById('daftarBelum');
    const daftarSudahBaca = document.getElementById('daftarSudah');
    
    listBelumBaca.innerHTML ='';
    listSudahBaca.innerHTML ='';

    // heading belum dibaca
    const elemenJudulbelumBaca = document.createElement('h3');
    elemenJudulbelumBaca.textContent = 'Daftar Buku yang Belum Selesai Dibaca';
    elemenJudulbelumBaca.style.textAlign = 'center';

    listBelumBaca.appendChild(elemenJudulbelumBaca);

    // heading sudah dibaca
    const elemenJudulsudahBaca = document.createElement('h3');
    elemenJudulsudahBaca.textContent = 'Daftar Buku yang Sudah Selesai Dibaca';
    elemenJudulsudahBaca.style.textAlign = 'center';

    listSudahBaca.appendChild(elemenJudulsudahBaca);

    daftarBelumBaca.innerHTML='';
    daftarSudahBaca.innerHTML='';

    listBelumBaca.appendChild(daftarBelumBaca);
    listSudahBaca.appendChild(daftarSudahBaca);

    books.forEach((buku) => {

        const elemenBuku = document.createElement('li');
        // style rak buku
        elemenBuku.style.display = 'flex';
        elemenBuku.style.flexDirection = 'row';
        elemenBuku.style.gap = '1rem';
        elemenBuku.style.justifyContent = 'center';
        elemenBuku.style.alignItems = 'center';
        elemenBuku.style.backgroundColor = 'var(--white)';
        elemenBuku.style.padding = '1rem';
        elemenBuku.style.width = '80%'
        elemenBuku.style.margin = '0.5rem';
        elemenBuku.style.border = '0px solid';
        elemenBuku.style.boxShadow = '0 2px 5px 1px rgba(7, 9, 18, 0.977)'
        elemenBuku.style.borderRadius = '10px';
        elemenBuku.textContent = `${buku.judul} - ${buku.penulis} ${buku.tahun}`;


        // button status buku
        const buttonBaca = document.createElement('button');
        buttonBaca.textContent = buku.isCompleted ? 'Belum selesai dibaca' : 'Sudah selesai dibaca';
        // style button status
        buttonBaca.style.backgroundColor = buku.isCompleted ? '#FFE194' : '#9FBB73';
        buttonBaca.style.padding = '0.5rem';
        buttonBaca.style.border = '0px';
        buttonBaca.style.borderRadius = '10px';
        buttonBaca.style.cursor = 'pointer';
        buttonBaca.style.boxShadow = '0 1px 2px 1px rgba(22, 23, 28, 0.897)';
        
        buttonBaca.addEventListener('click', function (){

            buku.isCompleted = !buku.isCompleted;
            localStorage.setItem('books', JSON.stringify(books));

            renderBuku();
        });

        // button hapus buku
        const buttonHapus = document.createElement('button');
        buttonHapus.textContent = 'Hapus Buku';
        // style button hapus
        buttonHapus.style.backgroundColor = '#BE3144';
        buttonHapus.style.padding = '0.5rem';
        buttonHapus.style.border = '0px';
        buttonHapus.style.borderRadius = '10px';
        buttonHapus.style.cursor = 'pointer';
        buttonHapus.style.boxShadow = '0 1px 2px 1px rgba(22, 23, 28, 0.897)';
        
        buttonHapus.addEventListener('click', function(){
            hapusBuku(buku.id);

            renderBuku();
        });

        elemenBuku.appendChild(buttonBaca);
        elemenBuku.appendChild(buttonHapus);


        if (buku.isCompleted){
            daftarSudahBaca.appendChild(elemenBuku);
        } else{
            daftarBelumBaca.appendChild(elemenBuku);
        }

    });

}

// fungsi fitur cari buku
function cariBuku(){
    const searchQuery = document.getElementById('searchBuku').value.toLowerCase();
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const searchResults = books.filter((buku) => {

    const judulLowerCase = buku.judul.toLowerCase();
    const penulisLowerCase = buku.penulis.toLowerCase();
    return judulLowerCase.includes(searchQuery) || penulisLowerCase.includes(searchQuery);
    });

    renderSearchResults(searchResults);
}

// fungsi render hasil pencarian
function renderSearchResults (results){
    const searchResultsSide = document.getElementById('searchResults');
    searchResultsSide.style.flexDirection = 'column';
    searchResultsSide.style.justifyContent = 'center';
    searchResultsSide.style.alignItems ='center';
    searchResultsSide.style.minHeight ='30vh';
    searchResultsSide.innerHTML = '';

    // heading hasil pencarian
    const judulFilter = document.createElement('h3');
    judulFilter.textContent = 'Filter';
    judulFilter.style.textAlign = 'center';

    searchResultsSide.appendChild(judulFilter);

    // hasil pencarian
    if (results.length === 0){
        const noResultsMessage = document.createElement('p');
        noResultsMessage.style.padding = '10px';
        noResultsMessage.textContent = 'Tidak Ada Hasil Pencarian';
        searchResultsSide.appendChild(noResultsMessage);
    } else{
        results.forEach((buku) => {
            const resultsItem = document.createElement('div');
            resultsItem.style.display = 'flex';
            resultsItem.style.flexDirection = 'row';
            resultsItem.style.gap = '1rem';
            resultsItem.style.margin = '0.5rem';
            resultsItem.style.justifyContent = 'center';
            resultsItem.style.alignItems = 'center';
            resultsItem.style.backgroundColor = 'var(--white)';
            resultsItem.style.padding = '1rem';
            resultsItem.style.width = '80%';
            resultsItem.style.border = '0px solid';
            resultsItem.style.boxShadow = '0 2px 5px 1px rgba(7, 9, 18, 0.977)'
            resultsItem.style.borderRadius = '10px';
            
            resultsItem.textContent = `${buku.judul} - ${buku.penulis} ${buku.tahun}`;

            const buttonBaca = document.createElement('button');
            buttonBaca.textContent = buku.isCompleted ? 'Belum Selesai Dibaca' : 'Sudah Selesai Dibaca';
            buttonBaca.style.backgroundColor = buku.isCompleted ? '#FFE194' : '#9FBB73';
            buttonBaca.style.padding = '0.5rem';
            buttonBaca.style.border = '0px';
            buttonBaca.style.borderRadius = '10px';
            buttonBaca.style.cursor = 'pointer';
            buttonBaca.style.boxShadow = '0 1px 2px 1px rgba(22, 23, 28, 0.897)';
            buttonBaca.addEventListener('click', function (){

            const books = JSON.parse(localStorage.getItem('books')) || [];
            const index = books.findIndex((item) => item.id === buku.id);

            if (index !== -1){
                books[index].isCompleted = !books[index].isCompleted;
                localStorage.setItem('books', JSON.stringify(books));
                    
                    renderBuku();
                }

            });

            const buttonHapus = document.createElement('button');
            buttonHapus.textContent = 'Hapus Buku';
            buttonHapus.style.backgroundColor = '#BE3144';
            buttonHapus.style.padding = '0.5rem';
            buttonHapus.style.border = '0px';
            buttonHapus.style.borderRadius = '10px';
            buttonHapus.style.cursor = 'pointer';
            buttonHapus.style.boxShadow = '0 1px 2px 1px rgba(22, 23, 28, 0.897)';
            
            buttonHapus.addEventListener('click', function(){
                hapusBuku(buku.id);
                renderBuku();
            });

            resultsItem.appendChild(buttonBaca);
            resultsItem.appendChild(buttonHapus);

            searchResultsSide.appendChild(resultsItem);

        });

        searchResultsSide.addEventListener('click', function(event) {

            if (!event.target.closest('searchResults')) {
                searchResultsSide.classList.add('hidden');
            }
                
        });

        document.getElementById('searchBuku').value = '';
    }

    searchResultsSide.classList.remove('hidden');
}

function hapusBuku (id){
    const books = JSON.parse (localStorage.getItem('books')) || [];

    const bukuToDelete = books.find((buku) => buku.id === id);
    if (!bukuToDelete){
        alert('Buku Tidak Ditemukan!');
        return;
    }

    const konfirmasi = window.confirm(`Apakah anda yakin ingin menghapus buku "${bukuToDelete.judul}"?`);

    if(konfirmasi){
        const filteredBooks = books.filter((buku) => buku.id !== id);
        localStorage.setItem('books', JSON.stringify(filteredBooks));
        alert('Buku Berhasil Dihapus!');
        renderBuku();
    } else {
        alert('Penghapusan buku dibatalkan.');
    }

    
}

document.addEventListener('DOMContentLoaded', function(){
    let books = JSON.parse(localStorage.getItem('books'));
    
    if (!books){
        localStorage.setItem('books', JSON.stringify([]));
        books = [];
    };

    renderBuku();

    document.getElementById('submitBook').addEventListener('click', function(){
        const judul = document.getElementById('judul').value;
        const penulis = document.getElementById('penulis').value;
        const tahun = document.getElementById('tahun').value;

        // validasi form input
        if (typeof judul !== 'string' && !(judul instanceof String)) {
            alert('Judul harus berupa string');
            return;
        }

        if (typeof penulis !== 'string' && !(penulis instanceof String)) {
            alert('Penulis harus berupa string');
            return;
        }

        if (isNaN(tahun)) {
            alert('Tahun harus berupa angka');
            return;
        }

        tambahBuku(judul, penulis, tahun, false);

        document.getElementById('judul').value = '';
        document.getElementById('penulis').value = '';
        document.getElementById('tahun').value = '';


    });

});