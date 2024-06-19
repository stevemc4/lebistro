import Button from 'components/button'
import Input from 'components/input'
import Layout from 'components/layouts/main'

export default function Login() {
  return (
    <Layout title="Login - Le Bistro">
      <form method="POST" class="m-auto w-full max-w-lg p-4 bg-neutral-50 dark:bg-neutral-800 rounded-md border border-neutral-400/40 dark:border-neutral-700/40 flex flex-col">
        <h1 class="font-bold">Masuk</h1>
        <label class="block mt-4" for="username-or-email">Username atau Email</label>
        <Input class="mt-1" name="usernameOrEmail" id="username-or-email" placeholder="Masukkan username atau email" required />
        <label class="block mt-2" for="password">Kata Sandi</label>
        <Input class="mt-1" name="password" id="password" placeholder="Masukkan kata sandi" type="password" required />
        <Button type="submit" class="mt-4">Masuk</Button>
      </form>
    </Layout>
  )
}
