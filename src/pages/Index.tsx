import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [wordCount, setWordCount] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('');
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  const languages = [
    { value: 'en-ru', label: 'Английский → Русский', multiplier: 1.0 },
    { value: 'de-ru', label: 'Немецкий → Русский', multiplier: 1.2 },
    { value: 'fr-ru', label: 'Французский → Русский', multiplier: 1.1 },
    { value: 'es-ru', label: 'Испанский → Русский', multiplier: 1.0 },
    { value: 'it-ru', label: 'Итальянский → Русский', multiplier: 1.1 },
    { value: 'zh-ru', label: 'Китайский → Русский', multiplier: 1.5 }
  ];

  const complexities = [
    { value: 'standard', label: 'Стандартный текст', multiplier: 1.0, price: 800 },
    { value: 'technical', label: 'Технический перевод', multiplier: 1.5, price: 1200 },
    { value: 'legal', label: 'Юридический перевод', multiplier: 1.8, price: 1440 },
    { value: 'medical', label: 'Медицинский перевод', multiplier: 2.0, price: 1600 }
  ];

  const calculatePrice = () => {
    if (wordCount && selectedLanguage && selectedComplexity) {
      const langMultiplier = languages.find(l => l.value === selectedLanguage)?.multiplier || 1;
      const complexity = complexities.find(c => c.value === selectedComplexity);
      if (complexity) {
        const price = wordCount * complexity.price * langMultiplier / 1000;
        setCalculatedPrice(price);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Languages" size={28} className="text-primary" />
              <span className="text-xl font-bold text-gray-900">TranslatePro</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Услуги</a>
              <a href="#about" className="text-gray-700 hover:text-primary transition-colors">Обо мне</a>
              <a href="#pricing" className="text-gray-700 hover:text-primary transition-colors">Тарифы</a>
              <a href="#reviews" className="text-gray-700 hover:text-primary transition-colors">Отзывы</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Контакты</a>
              <Button>Заказать перевод</Button>
            </div>
            <Button variant="outline" size="sm" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Профессиональные
                <span className="text-primary block">переводы</span>
                любой сложности
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                15+ лет опыта в переводах. Работаю с 12 языками. 
                Гарантирую качество и соблюдение сроков.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                <Button variant="outline" size="lg">
                  <Icon name="FileText" size={20} className="mr-2" />
                  Посмотреть портфолио
                </Button>
              </div>
            </div>
            <div className="lg:order-last animate-fade-in">
              <img 
                src="img/bb3f6c3f-83c6-43a3-801d-98f78554821f.jpg"
                alt="Профессиональный переводчик"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Калькулятор стоимости</h2>
            <p className="text-xl text-gray-600">Узнайте точную стоимость вашего перевода за несколько секунд</p>
          </div>

          <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-center">Рассчитать стоимость перевода</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="wordcount">Количество слов</Label>
                  <Input 
                    id="wordcount"
                    type="number" 
                    placeholder="1000"
                    value={wordCount || ''}
                    onChange={(e) => setWordCount(parseInt(e.target.value) || 0)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Языковая пара</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder="Выберите языки" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Сложность перевода</Label>
                <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                  <SelectTrigger className="text-lg">
                    <SelectValue placeholder="Выберите тип текста" />
                  </SelectTrigger>
                  <SelectContent>
                    {complexities.map((complexity) => (
                      <SelectItem key={complexity.value} value={complexity.value}>
                        {complexity.label} - {complexity.price}₽/1000 слов
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculatePrice} 
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                disabled={!wordCount || !selectedLanguage || !selectedComplexity}
              >
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>

              {calculatedPrice > 0 && (
                <div className="bg-primary/10 p-6 rounded-lg text-center animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Стоимость перевода: {calculatedPrice.toLocaleString('ru-RU')} ₽
                  </h3>
                  <p className="text-gray-600">
                    Цена может быть скорректирована после анализа текста
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Мои услуги</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Предоставляю полный спектр переводческих услуг для бизнеса и частных лиц
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'FileText',
                title: 'Письменный перевод',
                description: 'Переводы документов, договоров, технических текстов любой сложности',
                features: ['Высокое качество', 'Соблюдение сроков', 'Конфиденциальность']
              },
              {
                icon: 'Mic',
                title: 'Устный перевод',
                description: 'Синхронный и последовательный перевод на мероприятиях и встречах',
                features: ['Опыт 10+ лет', 'Любые форматы', 'Профессионализм']
              },
              {
                icon: 'Globe',
                title: 'Локализация',
                description: 'Адаптация контента под культурные особенности целевой аудитории',
                features: ['Культурная адаптация', 'SEO-оптимизация', 'Полная локализация']
              },
              {
                icon: 'BookOpen',
                title: 'Редактирование',
                description: 'Литературная обработка и редактура готовых переводов',
                features: ['Стилистическая правка', 'Проверка терминологии', 'Финальная доработка']
              },
              {
                icon: 'Award',
                title: 'Нотариальное заверение',
                description: 'Организация нотариального заверения переводов документов',
                features: ['Быстрое оформление', 'Все регионы', 'Юридическая сила']
              },
              {
                icon: 'Clock',
                title: 'Срочные переводы',
                description: 'Экспресс-переводы в кратчайшие сроки без потери качества',
                features: ['24/7 доступность', 'От 2 часов', 'Любой объем']
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={service.icon as any} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <Icon name="Check" size={16} className="text-secondary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Тарифы</h2>
            <p className="text-xl text-gray-600">Прозрачное ценообразование без скрытых комиссий</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Базовый',
                price: '800',
                period: '1000 слов',
                description: 'Для простых текстов',
                features: ['Стандартные тексты', 'Срок 2-3 дня', 'Email поддержка', 'Одна правка'],
                popular: false
              },
              {
                name: 'Профессиональный',
                price: '1200',
                period: '1000 слов',
                description: 'Оптимальный выбор',
                features: ['Технические тексты', 'Срок 1-2 дня', 'Приоритетная поддержка', 'Две правки', 'Терминологический глоссарий'],
                popular: true
              },
              {
                name: 'Премиум',
                price: '1800',
                period: '1000 слов', 
                description: 'Для сложных проектов',
                features: ['Любая сложность', 'Срочное выполнение', 'Персональный менеджер', 'Неограниченные правки', 'Нотариальное заверение'],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative bg-white border-0 shadow-xl ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Популярный
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-lg text-gray-600 ml-1">₽</span>
                  </div>
                  <p className="text-gray-600">за {plan.period}</p>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Icon name="Check" size={16} className="text-secondary mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-gray-900 hover:bg-gray-800'}`}
                  >
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-gray-600">Более 500 довольных клиентов за 15 лет работы</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Анна Петрова',
                company: 'ООО "ТехИнновации"',
                text: 'Отличная работа! Технический перевод выполнен качественно и в срок. Особенно порадовала внимательность к терминологии.',
                rating: 5
              },
              {
                name: 'Михаил Сидоров',
                company: 'Частный предприниматель',
                text: 'Перевод документов для визы был выполнен идеально. Быстро, качественно и с нотариальным заверением. Рекомендую!',
                rating: 5
              },
              {
                name: 'Елена Козлова',
                company: 'Издательский дом "Знание"',
                text: 'Сотрудничаем уже 3 года. Все переводы выполняются профессионально, стиль и смысл передаются точно.',
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index} className="bg-white border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <p className="text-sm text-gray-600">{review.company}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Свяжитесь со мной</h2>
            <p className="text-xl text-gray-600">Обсудим ваш проект и найдем оптимальное решение</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Контактная информация</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Icon name="Phone" size={20} className="text-primary mr-4" />
                  <span className="text-lg">+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Mail" size={20} className="text-primary mr-4" />
                  <span className="text-lg">info@translatepro.ru</span>
                </div>
                <div className="flex items-center">
                  <Icon name="MapPin" size={20} className="text-primary mr-4" />
                  <span className="text-lg">Москва, Россия</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={20} className="text-primary mr-4" />
                  <span className="text-lg">Пн-Пт: 9:00-18:00</span>
                </div>
              </div>
            </div>

            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Отправить сообщение</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Тема</Label>
                  <Input id="subject" placeholder="Тема сообщения" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Расскажите о вашем проекте..." 
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить сообщение
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Languages" size={24} className="text-primary" />
                <span className="text-xl font-bold">TranslatePro</span>
              </div>
              <p className="text-gray-400">
                Профессиональные переводческие услуги с гарантией качества
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Письменный перевод</li>
                <li>Устный перевод</li>
                <li>Локализация</li>
                <li>Редактирование</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li>О компании</li>
                <li>Портфолио</li>
                <li>Блог</li>
                <li>Карьера</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (999) 123-45-67</li>
                <li>info@translatepro.ru</li>
                <li>Москва, Россия</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TranslatePro. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;