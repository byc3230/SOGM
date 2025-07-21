"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Globe } from "lucide-react"
import Link from "next/link"

export default function WebTestPage() {
  const [url, setUrl] = useState("")
  const [isValidUrl, setIsValidUrl] = useState(false)

  const validateUrl = (inputUrl: string) => {
    try {
      new URL(inputUrl)
      setIsValidUrl(true)
    } catch {
      setIsValidUrl(false)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputUrl = e.target.value
    setUrl(inputUrl)
    validateUrl(inputUrl)
  }

  const handleStartTest = () => {
    if (isValidUrl && url) {
      window.location.href = `/test-results?url=${encodeURIComponent(url)}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6 pt-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Web 테스트</h1>
          <p className="text-lg text-gray-600">테스트할 웹사이트 URL을 입력해주세요</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              URL 입력
            </CardTitle>
            <CardDescription>자동화 테스트를 실행할 웹사이트의 전체 URL을 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="url">웹사이트 URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={handleUrlChange}
                className="text-lg"
              />
              {url && (
                <div className="flex items-center space-x-2">
                  <Badge variant={isValidUrl ? "default" : "destructive"}>
                    {isValidUrl ? "유효한 URL" : "잘못된 URL 형식"}
                  </Badge>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">테스트 항목</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 페이지 로딩 시간 측정</li>
                <li>• 스크린샷 캡처</li>
                <li>• HTTP 응답 상태 확인</li>
                <li>• 페이지 요소 검증</li>
                <li>• 성능 메트릭 수집</li>
              </ul>
            </div>

            <Button onClick={handleStartTest} disabled={!isValidUrl || !url} size="lg" className="w-full">
              <Play className="w-4 h-4 mr-2" />
              테스트 시작
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>테스트는 약 30초-1분 정도 소요됩니다.</p>
        </div>
      </div>
    </div>
  )
}
