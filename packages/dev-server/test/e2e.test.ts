import { test, expect } from '@playwright/test'

test('Should return 200 response', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)

  const content = await page.textContent('body')
  expect(content).toBe('Hello Vite!')

  const scriptContent = await page.textContent('script')
  console.log(scriptContent)
})

test('Should contain an injected script tag', async ({ page }) => {
  await page.goto('/')

  const lastScriptTag = await page.$('script:last-of-type')
  expect(lastScriptTag).not.toBeNull()

  const typeValue = await lastScriptTag?.getAttribute('type')
  expect(typeValue).toBe('module')

  const srcValue = await lastScriptTag?.getAttribute('src')
  expect(srcValue).toBe('/@vite/client')
})

test('Should have Cloudflare bindings', async ({ page }) => {
  const response = await page.goto('/name')
  expect(response?.status()).toBe(200)

  const content = await page.textContent('body')
  expect(content).toBe('My name is Hono')
})

test('Should not throw an error if using `waitUntil`', async ({ page }) => {
  const response = await page.goto('/wait-until')
  expect(response?.status()).toBe(200)

  const content = await page.textContent('body')
  expect(content).toBe('Hello Vite!')
})