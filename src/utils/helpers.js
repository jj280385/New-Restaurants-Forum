// set up axios
import axios from 'axios'

const baseURL = 'http://localhost:3000/api'

export const apiHelper = axios.create({
  baseURL
})

// set up sweetalert2

import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showCancelButton: false,
  timer: 3000,
})