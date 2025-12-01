window.CUSDIS_LOCALE = {
    powered_by: 'Terima kasih kepada Cusdis untuk sistem refleksi ini! 🌱',
    post_comment: 'Kongsi Perkongsian Anda 🌸',
    loading: 'Sedang menyediakan ruang bicara...',
    email: 'E-mel (InsyaAllah, maklumat anda akan dijaga dengan penuh amanah)',
    nickname: 'Nama Anda',
    reply: 'Tambah Pandangan',
    cancel_reply: 'Batalkan',
    reply_placeholder: 'Ingat, kongsikan pandangan anda dengan adab dan hikmah!',
    submitting: 'Sedang menghantar perkongsian...',
    sending: 'Hampir selesai...',
    submit: 'Siap! Boleh hantar!',
    comment_has_been_sent: 'JazakAllah Khair atas perkongsian yang bermanfaat! 🌟',
    like: 'Bagus!',
    delete: 'Padam',
    report: 'Laporkan',
    load_more: 'Muatkan lagi',
    no_comment: 'Belum ada perkongsian. Mulakan dengan bismillah!',
    placeholder: 'Kongsikan pengalaman dan pandangan anda di sini. Ingat, adab sebelum ilmu!',
    powered_by_cusdis: "",
    reply_btn: 'Tambah Pandangan',
}
document.addEventListener("DOMContentLoaded", () => {
    // Re-render Cusdis after include.js loads the comment section
    const observer = new MutationObserver(() => {
      const thread = document.querySelector("#cusdis_thread");
      if (thread && window.CUSDIS) {
        window.CUSDIS.renderTo(thread);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });