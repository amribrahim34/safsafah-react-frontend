import Swal from 'sweetalert2';
import { BRAND } from '@/content/brand';

export function createThemedSwal(isRtl = false) {
  return Swal.mixin({
    confirmButtonColor: BRAND.primary,
    cancelButtonColor: '#9ca3af',
    didOpen: (popup) => {
      popup.style.fontFamily = 'var(--font-cairo), sans-serif';
      if (isRtl) popup.style.direction = 'rtl';
    },
  });
}

export function showProductToast(message: string, isRtl = false) {
  Swal.mixin({
    toast: true,
    position: isRtl ? 'top-start' : 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (popup) => {
      popup.style.fontFamily = 'var(--font-cairo), sans-serif';
      if (isRtl) popup.style.direction = 'rtl';
    },
  }).fire({ icon: 'success', title: message });
}
