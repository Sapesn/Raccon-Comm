'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // 模拟登录过程
    setIsLoading(true)

    // 延迟 800ms 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 800))

    // 保存假的用户信息到 localStorage
    localStorage.setItem('user', JSON.stringify({
      email: email || 'demo@raccoon.com',
      name: '演示用户',
      avatar: '🦝',
      loggedIn: true,
    }))

    // 跳转到 Dashboard
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <span className="text-5xl">🦝</span>
          </div>
          <CardTitle className="text-2xl font-bold text-center">登录账户</CardTitle>
          <CardDescription className="text-center">
            使用您的邮箱和密码登录小浣熊知识库
            <br />
            <span className="text-xs text-muted-foreground/60">(演示模式：输入任意内容即可登录)</span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">密码</Label>
                <span className="text-sm text-muted-foreground">忘记密码（即将上线）</span>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? '登录中...' : '登录'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              还没有账号？{' '}
              <Link href="/register" className="text-primary font-medium hover:underline">
                立即注册
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
