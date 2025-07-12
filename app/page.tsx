import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Brain, MessageSquare, Zap, Users, Shield, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-black/20 border-b border-white/10">
        <Link href="/" className="flex items-center justify-center space-x-2">
          <Bot className="h-8 w-8 text-purple-400" />
          <span className="text-xl font-bold text-white">Intelligence Pro</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Услуги
          </Link>
          <Link href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            О нас
          </Link>
          <Link href="#contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Контакты
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                  Умные боты для{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Telegram
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl lg:text-2xl">
                  Разрабатываем интеллектуальных Telegram-ботов с использованием передовых нейросетей. Автоматизируйте
                  бизнес-процессы и улучшите взаимодействие с клиентами.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  Заказать бота
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 bg-transparent"
                >
                  Посмотреть примеры
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 bg-black/20 backdrop-blur-sm">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                Почему выбирают нас
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Мы создаем не просто ботов, а интеллектуальных помощников, которые понимают контекст и решают задачи
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <Brain className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">ИИ-интеграция</CardTitle>
                  <CardDescription className="text-gray-300">
                    Используем ChatGPT, Claude, Gemini и другие передовые нейросети для создания умных ботов
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">Естественное общение</CardTitle>
                  <CardDescription className="text-gray-300">
                    Боты понимают контекст, запоминают историю диалога и общаются как живые консультанты
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <Zap className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">Быстрая разработка</CardTitle>
                  <CardDescription className="text-gray-300">
                    От идеи до готового бота за 1-2 недели. Используем современные фреймворки и готовые решения
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <Users className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">Масштабируемость</CardTitle>
                  <CardDescription className="text-gray-300">
                    Боты выдерживают тысячи одновременных пользователей и легко масштабируются под нагрузку
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <Shield className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">Безопасность</CardTitle>
                  <CardDescription className="text-gray-300">
                    Все данные защищены, соблюдаем GDPR и российское законодательство о персональных данных
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <Bot className="h-12 w-12 text-purple-400 mb-4" />
                  <CardTitle className="text-white">Поддержка 24/7</CardTitle>
                  <CardDescription className="text-gray-300">
                    Предоставляем техническую поддержку и обновления для всех созданных ботов
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                Наши услуги
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Полный спектр услуг по разработке и внедрению Telegram-ботов для вашего бизнеса
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Чат-боты с ИИ</CardTitle>
                  <CardDescription className="text-gray-300">
                    Умные собеседники для клиентской поддержки, консультаций и продаж
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Обработка естественного языка</li>
                    <li>• Контекстные ответы</li>
                    <li>• Интеграция с CRM</li>
                    <li>• Аналитика диалогов</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">E-commerce боты</CardTitle>
                  <CardDescription className="text-gray-300">
                    Автоматизация продаж, каталоги товаров и обработка заказов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Каталог товаров</li>
                    <li>• Корзина и оплата</li>
                    <li>• Уведомления о заказах</li>
                    <li>• Программы лояльности</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Бизнес-автоматизация</CardTitle>
                  <CardDescription className="text-gray-300">
                    Автоматизация внутренних процессов и интеграция с системами
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Уведомления и отчеты</li>
                    <li>• Управление задачами</li>
                    <li>• Интеграция с API</li>
                    <li>• Мониторинг систем</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 bg-black/20 backdrop-blur-sm">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  О компании Intelligence Pro
                </h2>
                <p className="text-gray-300 text-lg">
                  Мы — команда опытных разработчиков, специализирующихся на создании интеллектуальных решений для
                  бизнеса. Наша миссия — сделать взаимодействие между компаниями и клиентами более эффективным с помощью
                  современных технологий искусственного интеллекта.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">50+ успешных проектов</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">3+ года опыта</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Команда экспертов</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Поддержка 24/7</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-3xl opacity-30"></div>
                <Card className="relative bg-white/5 border-white/10 backdrop-blur-sm p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Brain className="h-12 w-12 text-purple-400" />
                      <div>
                        <h3 className="text-white font-semibold text-lg">Экспертиза в ИИ</h3>
                        <p className="text-gray-300 text-sm">Глубокие знания в области машинного обучения</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MessageSquare className="h-12 w-12 text-purple-400" />
                      <div>
                        <h3 className="text-white font-semibold text-lg">Telegram API</h3>
                        <p className="text-gray-300 text-sm">Полное владение возможностями платформы</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Zap className="h-12 w-12 text-purple-400" />
                      <div>
                        <h3 className="text-white font-semibold text-lg">Быстрая разработка</h3>
                        <p className="text-gray-300 text-sm">Agile-подход и современные инструменты</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
                Свяжитесь с нами
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Готовы обсудить ваш проект? Оставьте заявку, и мы свяжемся с вами в течение часа
              </p>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-white text-2xl">Оставить заявку</CardTitle>
                  <CardDescription className="text-gray-300">
                    Расскажите о вашем проекте, и мы подготовим персональное предложение
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Имя</label>
                      <Input
                        placeholder="Ваше имя"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Телефон</label>
                      <Input
                        placeholder="+7 (999) 123-45-67"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Описание проекта</label>
                    <Textarea
                      placeholder="Расскажите подробнее о том, какой бот вам нужен..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Отправить заявку
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <div className="space-y-8">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-8 w-8 text-purple-400" />
                    <div>
                      <h3 className="text-white font-semibold">Телефон</h3>
                      <p className="text-gray-300">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-8 w-8 text-purple-400" />
                    <div>
                      <h3 className="text-white font-semibold">Email</h3>
                      <p className="text-gray-300">info@intelligencepro.ru</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="h-8 w-8 text-purple-400" />
                    <div>
                      <h3 className="text-white font-semibold">Telegram</h3>
                      <p className="text-gray-300">@intelligencepro_bot</p>
                    </div>
                  </div>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-8 w-8 text-purple-400" />
                    <div>
                      <h3 className="text-white font-semibold">Офис</h3>
                      <p className="text-gray-300">Москва, ул. Тверская, 1</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="space-y-6 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Готовы создать своего умного бота?
              </h2>
              <p className="text-gray-300 text-lg">
                Начните автоматизацию уже сегодня. Первая консультация — бесплатно!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3">
                  Получить консультацию
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 bg-transparent"
                >
                  Посмотреть портфолио
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container px-4 md:px-6 py-8 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-purple-400" />
                <span className="font-bold text-white">Intelligence Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                Создаем умных Telegram-ботов с использованием передовых нейросетей
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Услуги</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Чат-боты с ИИ</li>
                <li>E-commerce боты</li>
                <li>Бизнес-автоматизация</li>
                <li>Техподдержка</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>О нас</li>
                <li>Портфолио</li>
                <li>Блог</li>
                <li>Карьера</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+7 (999) 123-45-67</li>
                <li>info@intelligencepro.ru</li>
                <li>@intelligencepro_bot</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Intelligence Pro. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Политика конфиденциальности
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
