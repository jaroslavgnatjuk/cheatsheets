инсталим последнюю версию
npm install gulpjs/gulp#4.0
это для того чтобы использовать в require в gulpfile.js

для запуска программы gulp можно или проинсталить
глобально -g или в переменой PATH прописать 
export PATH=.node_modules/.bin:$PATH

const gulp = rquire('gulp');

gulp.task('demo:hello', hello);

4 способа завершения задачи:
можно использовать или колбэк:
function hello(callback) {
	console.log('hello');
	callback();
}

или возвращать промис:
function hello() {
	return new Promise()...
}

или возвращать поток:
function hello() {
	return reqire('fs').createReadStream(__filename);
}

или возвращать порожденный дочерний процесс:
function hello() {
	return require('child_process').spawn('ls', ['node_modules'], {stdio: 'inherit'});
}

можно запускать задачи из другой задачи:
gulp.task('example', gulp.series('hello', 'hello2', 'hello3')); есть еще gulp.parallel
данные между задачами передавать нельзя, т.е. если возвращаем поток или промис,
то когда поток будет прочитан задача завершиться, но не передаст считанные данные в другую задачу!


gulp.src определяет readable поток
gulp.dest определяет writable поток

простейший пример обработки файлов из дирректории:
function hello() {
	return gulp/src('source/**/*.*') //minimatch - модуль который обеспечивает поиск по паттернам
}		.on('data', function(file) {console.log(file.extname)}) //т.к. это потоки то может повесить обработчик а событие data
		.pipe(gulp.dest('dest')); //будет сохранять обработанные файлы в эту дирректорию

		вместо 'dest' можно функцию которая будет иметь логику для определения дирректории
		function (file) {
			return file.extname == '.js' ? 'js' :
					file.extname == '.css' ? 'css' : 'dest';
		}

gulp.src('source/**/*.{js,css}') берем только js или css файлы
gulp.src('{source1,source2}/**/*.{js,css}') берем только js или css файлы из двух дирректорий
gulp.src(['source1/*', 'source2/*']) исользуем массив чтобы указать четкую последовательность дирректорий
gulp.src(['source1/*', '!source2/*']) !-будет исключаться, этот метод исключения лучше не использовать изза соображений производительности, лучше изначально указывать только нужные пути
если нужно не считывать файлы целиком с данными, то нужно передавать доп.параметр {read: false}, тогда будут получены только имена файлов без содержимого. Актуально для больших файлов и задач где содержимое не нужно, например удаление файлов gulp.src('source/**/*.{js,css}', {read: false})

gulp.src('source/subfolder/*.{js,css}', {base: 'source'}) будет результат выкладывать в source, а не source/subfolder

.pipe(concat('all.css')) будет обьеденять все входящие файлы

gulp-debug можно использовать для вывода промежуточных результатов

gulp-sourcemaps
.pipe(sourcemaps.init()) ставим сразу после src, ставит свойство файла sourcemap, обычно все остальные плагины знают про это свойство и учитывают это

.pipe(sourcemaps.write()) нужно вызывать по окончании обработки, обычно перед dest, в результирующем файле суорсмап будет прямо в файле. Можно создать отдельным файлом, для этого нужно указать в write путь sourcemaps.write('.')

gulp-if удобно для проверки условий для использования плагинов, например:

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
return gulp.src('source/**/*.*')
		.pipe(gulpIf(isDevelopment, sourcemaps.init())) если девелопмент, тогда добавить соурсмапы

require('del') - удаляет файлы

gulp.task('clean', function () {
	return del('public');
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'assets'))); процесс сборки будет происходить так: сначала очистка, а потом параллельно остальные задачи сборки

gulp.watch('source/*.js', gulp.series('task1', 'task2'));

gulp.src('source/**/*.*', {since: gulp.lastRun('task1')}) будет обрабатывать только файлы которые были изменены с последнего запуска задачи task1

делаем задачу для наблюдения за изменениями файлов
gulp.task('watch', function () {
	gulp.watch('source1/*.js', gulp.series('task1'));
	gulp.watch('source2/*.js', gulp.series('task2', 'task3'));	
});
задача которая сначала собирает весь проект, а потом включает наблюдение за изменениями
gulp.task('dev', function () {
	gulp.series('build', 'watch');
});

вывод сообщений об ошибках в виде отдельного окошка
const notify = require('gulp-notify');
const combiner = require('stream-combiner2').obj;

gulp.task('styles', function () {
	return combine(
		gulp.src('source/**/*.{js,css}'),
		pipe(sass()),
		gulp.dest('public')
		)
	.on('error', notify.onError());
});








