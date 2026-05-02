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
